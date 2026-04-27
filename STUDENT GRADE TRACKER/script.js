const gradeTracker = {
  students: [],

  addStudent(name, grades) {
    this.students.push({ name, grades });
    renderStudents();
  },

  getStudent(name) {
    return this.students.find(s => s.name === name) || null;
  },

  getStudentAverage(name) {
    const student = this.getStudent(name);
    if (!student) return null;

    const values = Object.values(student.grades);
    return (values.reduce((a, b) => a + b, 0) / values.length).toFixed(2);
  },

  getSubjectAverage(subject) {
    const total = this.students.reduce((sum, s) => sum + (s.grades[subject] || 0), 0);
    return (total / this.students.length).toFixed(2);
  },

  getTopStudent() {
    return this.students.reduce((top, current) => {
      return this.getStudentAverage(current.name) >
        this.getStudentAverage(top.name)
        ? current
        : top;
    });
  },

  getStrugglingStudents() {
    return this.students.filter(s => this.getStudentAverage(s.name) < 70);
  },

  getLetterGrade(score) {
    if (score >= 90) return "A";
    if (score >= 80) return "B";
    if (score >= 70) return "C";
    if (score >= 60) return "D";
    return "F";
  },

  generateReportCard(name) {
    const student = this.getStudent(name);
    if (!student) return "Student not found";

    const avg = this.getStudentAverage(name);
    let report = `Report Card for ${name}\n`;

    for (let subject in student.grades) {
      report += `${subject}: ${student.grades[subject]}\n`;
    }

    report += `Average: ${avg} (${this.getLetterGrade(avg)})`;
    return report;
  }
};

// UI Logic
function addStudent() {
  const name = document.getElementById("name").value;
  const math = +document.getElementById("math").value;
  const eng = +document.getElementById("english").value;
  const sci = +document.getElementById("science").value;

  if (!name) return alert("Enter name");

  gradeTracker.addStudent(name, {
    math,
    english: eng,
    science: sci
  });

  document.querySelector("form").reset();
}

function renderStudents() {
  const list = document.getElementById("students");
  list.innerHTML = "";

  gradeTracker.students.forEach(s => {
    const avg = gradeTracker.getStudentAverage(s.name);

    list.innerHTML += `
      <div class="card">
        <h3>${s.name}</h3>
        <p>Average: ${avg}</p>
        <button onclick="alert(gradeTracker.generateReportCard('${s.name}'))">
          View Report
        </button>
      </div>
    `;
  });
}