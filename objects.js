// =======================
// EXERCISE 1: OBJECT BASICS
// =======================
console.log("=== Object Basics ===");

// Creating object
const person = {
    firstName: "Cheryl",
    lastName: "Adhiambo",
    age: 20,
    isStudent: true,
    hobbies: ["reading", "coding", "music"],
    address: {
        city: "Nairobi",
        country: "Kenya"
    }
};

// Accessing properties
console.log(person.firstName);        // Dot notation
console.log(person["lastName"]);      // Bracket notation
console.log(person.address.city);     // Nested

// Modifying properties
person.age = 21;
person.email = "cheryl@example.com"; // Add new property
delete person.isStudent;             // Remove property

console.log("Updated person:", person);


// =======================
// EXERCISE 2: OBJECT METHODS
// =======================
console.log("\n=== Object Methods ===");

const calculator = {
    add: function(a, b) {
        return a + b;
    },

    subtract(a, b) {
        return a - b;
    },

    multiply: (a, b) => a * b
};

console.log("Add:", calculator.add(5, 3));
console.log("Subtract:", calculator.subtract(10, 4));
console.log("Multiply:", calculator.multiply(6, 2));


// =======================
// EXERCISE 3: OBJECT ITERATION
// =======================
console.log("\n=== Object Iteration ===");

const scores = {
    math: 95,
    english: 88,
    science: 92
};

// Keys
console.log("Keys:", Object.keys(scores));

// Values
console.log("Values:", Object.values(scores));

// Entries
console.log("Entries:", Object.entries(scores));

// Loop through
for (const [subject, score] of Object.entries(scores)) {
    console.log(`${subject}: ${score}`);
}