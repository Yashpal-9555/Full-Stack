// Operator
// Arithmetic Operators
console.log(5 + 3); // Addition
console.log(5 - 3); // Subtraction
console.log(5 * 3); // Multiplication
console.log(5 / 3); // Division
console.log(5 % 3); // Modulus
console.log(5 ** 3); // Exponentiation

// Assignment Operators

let x = 5;
let y = 3;
x=x+y; // Addition assignment
x+=y; // Addition assignment
console.log(x); // 8

// NaN (Not a Number) type is number

// Number -> String
let num = 123;
let str = String(num);
console.log(str);

// Boolean -> Number true = 1, false = 0
// Null -> Number null = 0
// Undefined -> Number undefined = NaN

// 1. null is loosely equal to undefined
console.log(null == undefined); // true
console.log(null === undefined); // false

// 2.When  >, <, >=, <= operators (null is converted to 0, undefined is converted to NaN)
console.log(null > 0); // false
console.log(null < 0); // false
console.log(null >= 0); // true
console.log(null <= 0); // true 

console.log("Rohit">"Mohit"); // true
// It compares ASCII values of the characters. If the first character is same then it compares the second character and so on.

console.log("yohit">=true); // true is converted to 1, "yohit" is converted to NaN, NaN >= 1 is false

// NaN == NaN is false
console.log(NaN == NaN);

// for loop
for (let i = 0; i < 5; i++) {
    console.log(i);
}

// While loop
let j = 0;
while (j < 5) {
    console.log(j);
    j++;
}

// do while loop
let k = 0;
do {
    console.log(k);
    k++;
}while (k < 5);

// if else
let age = 18;
if (age >= 18) {
    console.log("You are an adult.");
}
else {
    console.log("You are a minor.");
}

//else if
let marks = 75;
if (marks >= 90) {
    console.log("Grade A");
}
else if (marks >= 80) {
    console.log("Grade B");
}   
else if (marks >= 70) {
    console.log("Grade C");
}
else {
    console.log("Grade D");
}

// Logical Operators
// && (AND) operator, || (OR) operator, ! (NOT) operator

console.log(true && false); // false
console.log(true || false); // true
console.log(!true); // false
console.log(!false); // true
console.log(true && true); // true
console.log(false || false); // false

let a = "abc";
let b = "Hello";
console.log(a && b); // output "Hello" because both a and b are truthy values, so the result is the last truthy value.
// if first value is falsy, it will return the first falsy value
// if first value is truthy, it will return the second value

// || (OR) operator returns the first truthy value or the last falsy value
console.log(a || b); // output "abc" because a is truthy, so the result is the first truthy value.
// if first value is truthy, it will return the first truthy value
// if first value is falsy, it will return the second value 




