// Array
// In js array is an object that can hold multiple values in a single variable. It is a data structure that allows you to store and manipulate collections of data. Arrays can hold elements of any type, including numbers, strings, objects, and even other arrays.

// Creating an array
let fruits = ['apple', 'banana', 'orange'];
console.log(fruits); // Output: ['apple', 'banana', 'orange']

// array.length property
// The length property of an array returns the number of elements in the array. It is a read-only property that can be used to determine the size of the array.
console.log(fruits.length); // Output: 3

// Accessing array elements
// You can access individual elements of an array using their index. The index of the first element is 0, the second element is 1, and so on.
console.log(fruits[0]); // Output: 'apple'
console.log(fruits[1]); // Output: 'banana'

// Modifying array elements
// You can modify the elements of an array by assigning a new value to a specific index.
fruits[1] = 'grape';
console.log(fruits); // Output: ['apple', 'grape', 'orange']

// Adding elements to an array  
// You can add elements to an array using the push() method, which adds an element to the end of the array, or the unshift() method, which adds an element to the beginning of the array.
fruits.push('kiwi');
console.log(fruits); // Output: ['apple', 'grape', 'orange', 'kiwi']

fruits.unshift('mango'); // Add at the beginning
console.log(fruits); // Output: ['mango', 'apple', 'grape', 'orange', 'kiwi']

// Removing elements from an array
// You can remove elements from an array using the pop() method, which removes the last element of the array, or the shift() method, which removes the first element of the array.
fruits.pop();
console.log(fruits); // Output: ['mango', 'apple', 'grape', 'orange']

fruits.shift(); // Remove the first element
console.log(fruits); // Output: ['apple', 'grape', 'orange']

// Iterating over an array
// You can iterate over the elements of an array using a for loop or the forEach() method.
for (let i = 0; i < fruits.length; i++) {
    console.log(fruits[i]);
}

// for of loop
for (let fruit of fruits) {
    console.log(fruit);
}

// Slice and Splice
// The slice() method returns a shallow copy of a portion of an array into a new array object. It does not modify the original array.
let citrus = fruits.slice(1, 3);
console.log(citrus); // Output: ['grape', 'orange']

// The splice() method changes the contents of an array by removing or replacing existing elements and/or adding new elements in place.
fruits.splice(1, 1, 'pear'); // Remove 1 element at index 1 and add 'pear'
console.log(fruits); // Output: ['apple', 'pear', 'orange']
console.log(fruits.splice(1,2,melon,lemon)) // Output: ['pear', 'orange'] and fruits will be ['apple', 'melon', 'lemon']

// Spreading operator
// The spread operator (...) allows you to expand an array into individual elements. It can be used to create a new array by combining existing arrays or adding new elements.
let moreFruits = ['kiwi', 'mango'];
let allFruits = [...fruits, ...moreFruits];
console.log(allFruits); // Output: ['apple', 'melon', 'lemon', 'kiwi', 'mango']

// Convert array to string
// You can convert an array to a string using the join() method, which concatenates all the elements of the array into a single string, separated by a specified separator.
let fruitString = fruits.join(', ');
console.log(fruitString); // Output: 'apple, melon, lemon'

// Sorting an array
// You can sort the elements of an array using the sort() method. By default, it sorts the elements as strings in ascending order.
let numbers = [3, 1, 4, 2];
numbers.sort();
console.log(numbers); // Output: [1, 2, 3, 4]


// You can also provide a compare function to sort the elements in a specific order.
numbers.sort((a, b) => b - a); // Sort in descending order a-b to sort in ascending order
console.log(numbers); // Output: [4, 3, 2, 1]

// Reversing an array
// You can reverse the order of the elements in an array using the reverse() method.
numbers.reverse();
console.log(numbers); // Output: [1, 2, 3, 4]

// Flattening an array
// You can flatten a nested array into a single-level array using the flat() method. It creates a new array with all sub-array elements concatenated into it recursively up to the specified depth.
let nestedArray = [1, [2, [3, 4]], 5];
let flattenedArray = nestedArray.flat(Infinity); // Flatten the array to any depth
console.log(flattenedArray); // Output: [1, 2, 3, 4, 5]


// Why not array in js
// In JavaScript, arrays are implemented as objects, which means they can hold elements of different types and have dynamic sizes. However, this flexibility comes with some trade-offs. Here are a few reasons why arrays in JavaScript may not be as efficient as arrays in other programming languages:

let arr = [1, "rohit", true]
for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
}