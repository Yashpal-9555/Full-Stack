// String

 const str1= "Hello, World!";
 const str2= 'Hello, JavaScript!';
 const day = 18;

 const str3= `Hello, ES6! ${day}`; // Most mordern way to define strings

 const str4 = `Hello Coder`;
 console.log(str4.length); // 11
 console.log(str4[0]); // H

 // uppercase and lowercase
 console.log(str4.toUpperCase());
 console.log(str4.toLowerCase());

 // indexOf
 console.log(str4.indexOf('Cod'));// index 6

 // lastIndexOf
    console.log(str4.lastIndexOf('o')); // index 8

// includes
console.log(str4.includes('Hello'));

// slice
console.log(str4.slice(0, 5)); // Hello
console.log(str4.slice(6)); // Coder leaves from index 6 to the end
consloe.log(str4.slice(-5)); // Coder leaves from index -5 to the end

// substring
console.log(str4.substring(0, 5)); // Hello can't use negative index

// replace
console.log(str4.replace('Coder', 'World')); // Hello World
// replaceAll replaces all occurrences of a substring with a new substring

// trim
const str5 = '   Hello, World!   ';
console.log(str5.trim()); // Hello, World!

// split
const str6 = 'Hello, World!';
const arr = str6.split(','); // splits the string into an array of substrings
console.log(arr); // ['Hello', ' World!']

