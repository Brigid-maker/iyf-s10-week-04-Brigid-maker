/**
 * script.js — Grade Tracker
 * =========================
 * Contains:
 *   1. gradeTracker object  — all required methods (Task 8.3)
 *   2. Render engine        — updates the DOM from state
 *   3. Event listeners      — form submission, row selection
 */

'use strict';

/* ═══════════════════════════════════════════════════════════
   1. GRADE TRACKER — Core Implementation
   ═══════════════════════════════════════════════════════════ */

const gradeTracker = {
  students: [],

  /**
   * Add a new student.
   * @param {string} name
   * @param {Object} grades  e.g. { math: 85, english: 90 }
   */
  addStudent(name, grades) {
    this.students.push({ name, grades });
  },

  /**
   * Find a student by name.
   * @param {string} name
   * @returns {Object|null}
   */
  getStudent(name) {
    return this.students.find(s => s.name === name) || null;
  },

  /**
   * Calculate a student's overall average.
   * @param {string} name
   * @returns {number|null}
   */
  getStudentAverage(name) {
    const student = this.getStudent(name);
    if (!student) return null;
    const values = Object.values(student.grades);
    const sum    = values.reduce((total, g) => total + g, 0);
    return Math.round((sum / values.length) * 100) / 100;
  },

  /**
   * Get the class average for a specific subject.
   * @param {string} subject
   * @returns {number|null}
   */
  getSubjectAverage(subject) {
    const enrolled = this.students.filter(s => subject in s.grades);
    if (enrolled.length === 0) return null;
    const sum = enrolled.reduce((total, s) => total + s.grades[subject], 0);
    return Math.round((sum / enrolled.length) * 100) / 100;
  },

  /**
   * Return the name of the student with the highest average.
   * @returns {string|null}
   */
  getTopStudent() {
    if (this.students.length === 0) return null;
    return this.students.reduce((top, s) =>
      this.getStudentAverage(s.name) > this.getStudentAverage(top.name) ? s : top
    ).name;
  },

  /**
   * Return names of students whose average is below 70.
   * @returns {string[]}
   */
  getStrugglingStudents() {
    return this.students
      .filter(s => this.getStudentAverage(s.name) < 70)
      .map(s => s.name);
  },

  /**
   * Convert a numeric score to a letter grade.
   * A: 90+ | B: 80–89 | C: 70–79 | D: 60–69 | F: below 60
   * @param {number} score
   * @returns {string}
   */
  getLetterGrade(score) {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  },

  /**
   * Generate a formatted text report card for a student.
   * @param {string} name
   * @returns {string}
   */
  generateReportCard(name) {
    const student = this.getStudent(name);
    if (!student) return `Student "${name}" not found.`;

    const avg = this.getStudentAverage(name);
    const lines = [
      `╔═══════════════════════════════╗`,
      `   REPORT CARD — ${name.toUpperCase()}`,
      `───────────────────────────────`,
    ];

    for (const [subject, grade] of Object.entries(student.grades)) {
      lines.push(
        `  ${subject.padEnd(12)} ${String(grade).padStart(3)}   ${this.getLetterGrade(grade)}`
      );
    }

    lines.push(`───────────────────────────────`);
    lines.push(`  ${'AVERAGE'.padEnd(12)} ${String(avg).padStart(3)}   ${this.getLetterGrade(avg)}`);
    lines.push(`╚═══════════════════════════════╝`);

    return lines.join('\n');
  },

  // ── Task 8.3 — All required array method uses ───────────

  /** map: get all student names */
  getAllNames() {
    return this.students.map(s => s.name);
  },

  /** filter: students with average > 80 */
  getHighAchievers() {
    return this.students.filter(s => this.getStudentAverage(s.name) > 80);
  },

  /** find: locate a specific student */
  findByName(name) {
    return this.students.find(s => s.name === name);
  },

  /** reduce: calculate overall class average */
  getClassAverage() {
    if (this.students.length === 0) return null;
    const total = this.students.reduce((sum, s) => sum + this.getStudentAverage(s.name), 0);
    return Math.round((total / this.students.length) * 100) / 100;
  },

  /** sort: students ranked by grade descending */
  getSortedByGrade() {
    return [...this.students].sort(
      (a, b) => this.getStudentAverage(b.name) - this.getStudentAverage(a.name)
    );
  },

  /** some: check if any student scored above 90 */
  hasTopPerformer() {
    return this.students.some(s => this.getStudentAverage(s.name) > 90);
  },

  /** every: check if all students are passing (≥ 60) */
  allPassing() {
    return this.students.every(s => this.getStudentAverage(s.name) >= 60);
  },
};


/* ═══════════════════════════════════════════════════════════
   2. CONSTANTS & STATE
   ═══════════════════════════════════════════════════════════ */

/** Maps letter grade → hex colour */
const GRADE_COLORS = {
  A: '#4a7c59',
  B: '#c9922a',
  C: '#2a5c8a',
  D: '#c0441a',
  F: '#e05050',
};

/** Currently selected student name (for report card) */
let selectedStudent = null;


/* ═══════════════════════════════════════════════════════════
   3. RENDER ENGINE
   ═══════════════════════════════════════════════════════════ */

/** Master render — called after every state change. */
function render() {
  renderStats();
  renderTable();
  renderSubjectAverages();
  renderStrugglingAlert();
  renderReportCard();
}

/* ── Stats Row ──────────────────────────────────────────── */
function renderStats() {
  const count    = gradeTracker.students.length;
  const classAvg = gradeTracker.getClassAverage();
  const top      = gradeTracker.getTopStudent();

  document.getElementById('stat-count').textContent = count;
  document.getElementById('stat-avg').textContent   = classAvg ?? '—';

  const topEl = document.getElementById('stat-top');
  topEl.textContent  = top || '—';
  topEl.style.color  = top ? 'var(--gold)' : 'var(--muted)';

  document.getElementById('roster-count').textContent = count;
}

/* ── Student Roster Table ───────────────────────────────── */
function renderTable() {
  const tbody = document.getElementById('table-body');

  if (gradeTracker.students.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="4" class="empty">
          <span class="empty-icon">🎓</span>
          Add students to get started
        </td>
      </tr>`;
    return;
  }

  tbody.innerHTML = gradeTracker.getSortedByGrade().map(student => {
    const avg    = gradeTracker.getStudentAverage(student.name);
    const letter = gradeTracker.getLetterGrade(avg);
    const color  = GRADE_COLORS[letter];
    const isSelected = selectedStudent === student.name;

    // subject grade pills
    const pills = Object.entries(student.grades)
      .map(([sub, g]) =>
        `<span class="grade-pill">${sub.slice(0, 3).toUpperCase()} <strong>${g}</strong></span>`
      ).join('');

    return `
      <tr class="${isSelected ? 'selected' : ''}" onclick="selectStudent('${student.name}')">
        <td><span class="student-name">${student.name}</span></td>
        <td>${pills}</td>
        <td>
          <div class="avg-bar-wrap">
            <div class="avg-bar">
              <div class="avg-bar-fill" style="width:${avg}%; background:${color}"></div>
            </div>
            <span class="avg-num">${avg}</span>
          </div>
        </td>
        <td><span class="badge badge-${letter}">${letter}</span></td>
      </tr>`;
  }).join('');
}

/* ── Subject Averages (sidebar) ─────────────────────────── */
function renderSubjectAverages() {
  const el          = document.getElementById('subject-avgs');
  const allSubjects = [...new Set(
    gradeTracker.students.flatMap(s => Object.keys(s.grades))
  )];

  if (allSubjects.length === 0) {
    el.innerHTML = `
      <div class="empty" style="padding:1rem 0">
        <span class="empty-icon">📊</span>No data yet
      </div>`;
    return;
  }

  el.innerHTML = allSubjects.map(sub => {
    const avg    = gradeTracker.getSubjectAverage(sub);
    const letter = gradeTracker.getLetterGrade(avg);
    const color  = GRADE_COLORS[letter];

    return `
      <div class="subject-row">
        <div class="subject-row-head">
          <span class="subject-name">${sub}</span>
          <span class="subject-score">
            ${avg}
            <span class="badge badge-${letter}" style="width:20px;height:20px;font-size:0.6rem">${letter}</span>
          </span>
        </div>
        <div class="avg-bar" style="height:5px">
          <div class="avg-bar-fill" style="width:${avg}%; background:${color}"></div>
        </div>
      </div>`;
  }).join('');
}

/* ── Struggling Students Alert ──────────────────────────── */
function renderStrugglingAlert() {
  const wrap       = document.getElementById('struggling-wrap');
  const struggling = gradeTracker.getStrugglingStudents();

  wrap.innerHTML = struggling.length
    ? `<div class="alert">⚠ Needs attention: <strong>${struggling.join(', ')}</strong> — average below 70</div>`
    : '';
}

/* ── Report Card ─────────────────────────────────────────── */
function renderReportCard() {
  const wrap = document.getElementById('report-wrap');

  if (!selectedStudent || !gradeTracker.getStudent(selectedStudent)) {
    wrap.innerHTML = '';
    return;
  }

  const student = gradeTracker.getStudent(selectedStudent);
  const avg     = gradeTracker.getStudentAverage(selectedStudent);
  const letter  = gradeTracker.getLetterGrade(avg);
  const color   = GRADE_COLORS[letter];

  const rows = Object.entries(student.grades).map(([sub, grade]) => {
    const l = gradeTracker.getLetterGrade(grade);
    return `
      <div class="report-row">
        <span class="report-subject">${sub}</span>
        <div class="report-score-bar">
          <div class="report-score-track">
            <div class="report-score-fill" style="width:${grade}%; background:${GRADE_COLORS[l]}"></div>
          </div>
        </div>
        <span class="report-score-num">${grade}</span>
        <span class="badge badge-${l} report-badge">${l}</span>
      </div>`;
  }).join('');

  wrap.innerHTML = `
    <div class="report-card">
      <div class="report-header">
        <div class="report-header-left">
          <div class="report-eyebrow">Report Card</div>
          <div class="report-name">${student.name}</div>
        </div>
        <div class="report-header-right">
          <div class="report-avg-eyebrow">Average</div>
          <div class="report-avg" style="color:${color === '#c9922a' ? 'var(--gold-lt)' : color}">${avg}</div>
          <span class="badge badge-${letter}" style="margin-top:0.2rem">${letter}</span>
        </div>
      </div>
      <div class="report-body">${rows}</div>
    </div>`;
}


/* ═══════════════════════════════════════════════════════════
   4. EVENT LISTENERS
   ═══════════════════════════════════════════════════════════ */

/** Toggle report card for a selected student. */
function selectStudent(name) {
  selectedStudent = selectedStudent === name ? null : name;
  render();
}

/** Add Student button */
document.getElementById('btn-add').addEventListener('click', () => {
  const nameInput    = document.getElementById('inp-name');
  const mathInput    = document.getElementById('inp-math');
  const englishInput = document.getElementById('inp-english');
  const scienceInput = document.getElementById('inp-science');
  const historyInput = document.getElementById('inp-history');
  const msgEl        = document.getElementById('form-msg');

  const name = nameInput.value.trim();

  // Validation
  if (!name) {
    showMessage(msgEl, 'Please enter a name.', 'error');
    return;
  }

  if (gradeTracker.getStudent(name)) {
    showMessage(msgEl, 'Student already exists.', 'error');
    return;
  }

  // Build grades object from whichever fields have values
  const grades = {};
  if (mathInput.value    !== '') grades.math    = clampGrade(mathInput.value);
  if (englishInput.value !== '') grades.english = clampGrade(englishInput.value);
  if (scienceInput.value !== '') grades.science = clampGrade(scienceInput.value);
  if (historyInput.value !== '') grades.history = clampGrade(historyInput.value);

  if (Object.keys(grades).length === 0) {
    showMessage(msgEl, 'Enter at least one grade.', 'error');
    return;
  }

  // Add the student and refresh UI
  gradeTracker.addStudent(name, grades);

  // Reset form
  [nameInput, mathInput, englishInput, scienceInput, historyInput]
    .forEach(el => el.value = '');

  showMessage(msgEl, `${name} added!`, 'success');
  selectedStudent = name;
  render();
});

/** Allow Enter key to submit the form */
document.querySelectorAll('.form-input, .grade-field input').forEach(el => {
  el.addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('btn-add').click();
  });
});


/* ═══════════════════════════════════════════════════════════
   5. UTILITY FUNCTIONS
   ═══════════════════════════════════════════════════════════ */

/**
 * Clamp a raw input value to a valid grade (0–100).
 * @param {string} val
 * @returns {number}
 */
function clampGrade(val) {
  return Math.min(100, Math.max(0, Number(val)));
}

/**
 * Display a temporary feedback message below the form.
 * @param {HTMLElement} el
 * @param {string}      text
 * @param {'success'|'error'} type
 */
function showMessage(el, text, type) {
  el.style.color  = type === 'success' ? 'var(--sage)' : 'var(--rust)';
  el.textContent  = text;
  if (type === 'success') {
    setTimeout(() => el.textContent = '', 2500);
  }
}


/* ═══════════════════════════════════════════════════════════
   6. INITIALISE
   ═══════════════════════════════════════════════════════════ */

// Seed data — required by the assignment
gradeTracker.addStudent("Alice",   { math: 95, english: 88, science: 92 });
gradeTracker.addStudent("Bob",     { math: 72, english: 85, science: 78 });
gradeTracker.addStudent("Charlie", { math: 60, english: 65, science: 58 });

// Pre-select Alice so a report card is visible on load
selectedStudent = 'Alice';

// First render
render();

// ── Assignment required console outputs ─────────────────────
console.log('=== Task 8.3 — Required Outputs ===');
console.log(gradeTracker.getStudentAverage("Alice"));   // 91.67
console.log(gradeTracker.getSubjectAverage("math"));    // 75.67
console.log(gradeTracker.getTopStudent());              // Alice
console.log(gradeTracker.getStrugglingStudents());      // ['Charlie']
console.log(gradeTracker.generateReportCard("Alice"));