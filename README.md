# iyf-s10-week-04-Brigid-maker
// Basic math
let a = 10;
let b = 3;

console.log("Addition:", a + b);
console.log("Subtraction:", a - b);
console.log("Multiplication:", a * b);
console.log("Division:", a / b);
console.log("Modulus:", a % b);
console.log("Exponent:", a ** b);

// Increment/Decrement
let count = 0;
count++;
count--;

console.log("Final count:", count);





// =======================
// EXERCISE 1: NUMBER OPERATIONS
// =======================
console.log("\n=== Number Operations ===");

let a = 10;
let b = 3;

console.log("Addition:", a + b);
console.log("Subtraction:", a - b);
console.log("Multiplication:", a * b);
console.log("Division:", a / b);
console.log("Modulus:", a % b);
console.log("Exponent:", a ** b);

let count = 0;
count++;
count--;
console.log("Final count:", count);


// =======================
// EXERCISE 2: STRING OPERATIONS
// =======================
console.log("\n=== String Operations ===");

let firstName = "Cheryl";
let lastName = "Adhiambo";

let fullName = firstName + " " + lastName;
let greeting = `Hello, ${firstName}!`;
let message = `Your name has ${firstName.length} characters.`;

console.log("Full Name:", fullName);
console.log(greeting);
console.log(message);

console.log(fullName.toUpperCase());
console.log(fullName.toLowerCase());
console.log(firstName.charAt(0));
console.log(fullName.includes("Cheryl"));


// =======================
// EXERCISE 3: COMPARISON & LOGICAL
// =======================
console.log("\n=== Comparison & Logical ===");

console.log(5 > 3);
console.log(5 < 3);
console.log(5 === 5);
console.log(5 == "5");
console.log(5 !== 3);

console.log(true && true);
console.log(true || false);
console.log(!true);


// =======================
// CHALLENGE
// =======================
console.log("\n=== Age Challenge ===");

let myAge = myAge || 20; // safe fallback

let ageInDays = myAge * 365;
let ageInHours = myAge * 365 * 24;

let currentYear = new Date().getFullYear();
let yearAt100 = currentYear + (100 - myAge);

console.log("Age in days:", ageInDays);
console.log("Age in hours:", ageInHours);
console.log("Year you turn 100:", yearAt100);