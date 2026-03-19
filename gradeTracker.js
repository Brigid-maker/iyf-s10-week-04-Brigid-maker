// =======================
// Mini-Project: Student Grade Tracker
// =======================

const gradeTracker = {
    students: [],

    // Add a new student
    addStudent(name, grades) {
        this.students.push({ name, grades });
    },

    // Get a student by name
    getStudent(name) {
        return this.students.find(student => student.name === name) || null;
    },

    // Calculate a student's average
    getStudentAverage(name) {
        const student = this.getStudent(name);
        if (!student) return null;
        const grades = Object.values(student.grades);
        const sum = grades.reduce((total, g) => total + g, 0);
        return (sum / grades.length).toFixed(2);
    },

    // Get class average for a subject
    getSubjectAverage(subject) {
        const subjectGrades = this.students
            .map(s => s.grades[subject])
            .filter(g => g !== undefined);
        if (subjectGrades.length === 0) return null;
        const sum = subjectGrades.reduce((total, g) => total + g, 0);
        return (sum / subjectGrades.length).toFixed(2);
    },

    // Get top performer (highest overall average)
    getTopStudent() {
        if (this.students.length === 0) return null;
        let top = this.students[0];
        let topAvg = parseFloat(this.getStudentAverage(top.name));
        for (const s of this.students) {
            const avg = parseFloat(this.getStudentAverage(s.name));
            if (avg > topAvg) {
                top = s;
                topAvg = avg;
            }
        }
        return top.name;
    },

    // Get students needing help (average < 70)
    getStrugglingStudents() {
        return this.students.filter(s => parseFloat(this.getStudentAverage(s.name)) < 70)
                            .map(s => s.name);
    },

    // Get letter grade
    getLetterGrade(score) {
        if (score >= 90) return "A";
        if (score >= 80) return "B";
        if (score >= 70) return "C";
        if (score >= 60) return "D";
        return "F";
    },

    // Generate report card
    generateReportCard(name) {
        const student = this.getStudent(name);
        if (!student) return null;

        const grades = student.grades;
        const average = this.getStudentAverage(name);
        let report = `Report Card for ${student.name}:\n`;

        for (const subject in grades) {
            report += `${subject}: ${grades[subject]} (${this.getLetterGrade(grades[subject])})\n`;
        }

        report += `Average: ${average} (${this.getLetterGrade(average)})`;
        return report;
    }
};

// =======================
// Test Implementation
// =======================
gradeTracker.addStudent("Alice", { math: 95, english: 88, science: 92 });
gradeTracker.addStudent("Bob", { math: 72, english: 85, science: 78 });
gradeTracker.addStudent("Charlie", { math: 60, english: 65, science: 58 });

// Test outputs
console.log("Alice average:", gradeTracker.getStudentAverage("Alice"));      // 91.67
console.log("Math average:", gradeTracker.getSubjectAverage("math"));       // 75.67
console.log("Top student:", gradeTracker.getTopStudent());                  // Alice
console.log("Students needing help:", gradeTracker.getStrugglingStudents()); // ["Charlie"]
console.log("\n" + gradeTracker.generateReportCard("Alice"));              // Full report