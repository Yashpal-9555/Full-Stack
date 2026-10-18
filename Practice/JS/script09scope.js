// Scope and Closure , HOF
// Global Scope -> accessible from anywhere in the code
// functional Scope -> accessible only within the function
// Block Scope -> accessible only within the block (e.g., inside curly braces {})
// This is valid only for let and const variables, not var

// Map Set Filter Reduce for each loop

const arr = [10, 20, 50, 5]

arr.forEach((number) => {
     console.log(number);
})

// Filter returns new array
const newarr = arr.filter((number)=> number>25);
console.log(newarr);

//Map 
// Returns every element in array to a condition in a new array

const newArr = arr.map((num) => num+3);




