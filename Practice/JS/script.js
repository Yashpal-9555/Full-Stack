// Variables in js

// let is used if we want to change the value of a variable
let name = "John"; // string variable

// If we want to fix the value of a variable we can use const
// Need to assign a value to const variable at the time of declaration
const age = 30; // number variable

// Old method for variable declaration
// can be accessed out of scope is demrit
// var can be redeclared is demrit
var isStudent = true; // boolean variable

console.log("Name:", name);
console.log("Age:", age);
console.log("Is Student:", isStudent);

 
// Data types in js

// primitives

// string, number, boolean, null, undefined, symbol, bigint
let a=10; // number
let b= 2.36; // number
console.log(a,b);

//string
let c = "Hello World"; // string
let d = 'Anjali'; // string
console.log(c,d); 

// Boolean
let login = true;
console.log(login);

// undefined
let e;
console.log(e);

// bigint
// To store number which is greater than 2^53 - 1 we can use bigint the minimum number is -2^53 + 1
let f = 1234567890123456789012345678901234567890n;
console.log(f);

// null
// Its type is object but it is used to represent empty value
let weather = null;
console.log(weather);

//Symbol
let g = Symbol("Hello");
console.log(g);


// Non primitives
// Typeof non primitives is object

// object, array, function

// Array
// Type of array is object
let arr = [1,2,3,'Shani',true];
console.log(arr);

// Object
let obj = {
    name: "Shani",
    age: 20,
    isStudent: true
}
console.log(obj);

// Function
// We can store function in a variable and can be called using that variable
function greet(name){
    console.log("Hello "+ name);
}

greet("Shani");

