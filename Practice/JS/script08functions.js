// Functions are blocks of code that can be reused throughout your program. They help to keep your code organized and make it easier to read and maintain.

// Function Declaration
function greet(name) {
    return `Hello, ${this.name}!`;
}

function add(num1, num2, num3=0, num4=0){
    const sum= num1 + num2 + num3 + num4;
    return sum;
}

// Flexible Function with rest operator used when we don't know how many arguments will be passed to the function
function sumAll(...numbers) {
    let total = 0;
    for (let number of numbers) {
        total += number;
    }
    return total;
}

// Function Expression
const multiply = function(num1, num2) {
    return num1 * num2;
}

// Arrow Function
const divide = (num1, num2) => {
    if (num2 === 0) {
        return "Cannot divide by zero";
    }
    return num1 / num2;
}

// If we have only one parameter we can skip the parenthesis
const square = num => num * num;
// If we have only one line of code we can skip the curly braces and the return statement
const cube = num => num * num * num;

// object with arrow function
const greeting = () =>({name: "John", age: 30});

// IIFE (Immediately Invoked Function Expression)
(function() {
    console.log("This function runs immediately after it's defined!");
})();

// Call back function
// Make code reusable and modular by passing functions as arguments to other functions. This allows us to create higher-order functions that can operate on different types of data and perform different actions based on the callback function provided.
function greet(){
    console.log("Hello!");
}

function meet(callback){
    console,log("Nice to meet you!");
    callback();
    // code hota to
    console.log("Bye!");
}
meet(greet); // passing greet function as an argument to meet function
// output: Nice to meet you! Hello!

