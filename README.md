// =======================
// EXERCISE 1: ARRAY BASICS
// =======================
console.log("=== Array Basics ===");

// Creating arrays
const fruits = ["apple", "banana", "orange"];
const numbersBasic = [1, 2, 3, 4, 5];
const mixed = ["hello", 42, true, null];

// Accessing elements
console.log("First fruit:", fruits[0]);
console.log("Number of fruits:", fruits.length);

// Modifying arrays
fruits.push("grape");       // Add to end
fruits.unshift("mango");    // Add to start
fruits.pop();               // Remove from end
fruits.shift();             // Remove from start

console.log("Updated fruits:", fruits);


// =======================
// EXERCISE 2: ARRAY METHODS
// =======================
console.log("\n=== Array Methods ===");

const numbers = [1, 2, 3, 4, 5];

// forEach
numbers.forEach(num => console.log("Double:", num * 2));

// map
const doubled = numbers.map(num => num * 2);
console.log("Doubled array:", doubled);

// filter
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log("Even numbers:", evenNumbers);

// find
const firstEven = numbers.find(num => num % 2 === 0);
console.log("First even number:", firstEven);

// reduce
const sum = numbers.reduce((total, num) => total + num, 0);
console.log("Sum:", sum);

// includes
console.log("Includes 3:", numbers.includes(3));


// =======================
// BUILD TASKS
// =======================
console.log("\n=== Build Tasks ===");

const testNumbers = [2, -5, 8, 12, -3, 7];

// 1️⃣ Double all numbers
const doubledAll = testNumbers.map(num => num * 2);
console.log("Doubled:", doubledAll);

// 2️⃣ Filter out negative numbers
const noNegatives = testNumbers.filter(num => num >= 0);
console.log("No negatives:", noNegatives);

// 3️⃣ Find first number greater than 10
const greaterThanTen = testNumbers.find(num => num > 10);
console.log("First > 10:", greaterThanTen);

// 4️⃣ Product of all numbers
const product = testNumbers.reduce((total, num) => total * num, 1);
console.log("Product:", product);