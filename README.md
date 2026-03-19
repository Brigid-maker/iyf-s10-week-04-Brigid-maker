// =======================
// Working with Real Data
// =======================
console.log("=== Student Data Exercise ===");

const students = [
    { name: "Alice", age: 22, grade: 85, major: "CS" },
    { name: "Bob", age: 20, grade: 72, major: "Math" },
    { name: "Charlie", age: 23, grade: 90, major: "CS" },
    { name: "Diana", age: 21, grade: 88, major: "Physics" },
    { name: "Eve", age: 22, grade: 95, major: "CS" }
];

// 1️⃣ Get all student names
const names = students.map(student => student.name);
console.log("All student names:", names);

// 2️⃣ Get students with grade > 80
const highAchievers = students.filter(student => student.grade > 80);
console.log("Students with grade > 80:", highAchievers);

// 3️⃣ Find the student named "Charlie"
const charlie = students.find(student => student.name === "Charlie");
console.log("Student named Charlie:", charlie);

// 4️⃣ Calculate average grade
const avgGrade = students.reduce((total, student) => total + student.grade, 0) / students.length;
console.log("Average grade:", avgGrade);

// 5️⃣ Get CS majors only
const csMajors = students.filter(student => student.major === "CS");
console.log("CS majors:", csMajors);

// 6️⃣ Sort by grade (highest first)
const sortedByGrade = [...students].sort((a, b) => b.grade - a.grade);
console.log("Students sorted by grade (highest first):", sortedByGrade);

// 7️⃣ Check if any student has grade > 90
const hasTopStudent = students.some(student => student.grade > 90);
console.log("Any student with grade > 90?", hasTopStudent);

// 8️⃣ Check if all students are passing (grade >= 60)
const allPassing = students.every(student => student.grade >= 60);
console.log("All students passing?", allPassing);