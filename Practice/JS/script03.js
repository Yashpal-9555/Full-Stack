// Number
 let a=10;
 let b= 2.645;
 let c = b.toFixed(2); //generates a string with 2 decimal places

 console.log(typeof(c));
 console.log(c);

 console.log(b.toPrecision(3)); //generates a string with 3 significant digits  
 console.log(b.toString()); //generates a string representation of the number

let d = new Number(5); // creates a Number object
console.log(typeof(d));
 let e = new Number(5);
console.log(d==e);// false, because they are different objects points to different memory locations

// Non premitive are compared by reference, not by value. So even if they have the same value, they are not equal because they are different objects in memory.
// Primitive by value 

console.log(Math.random()); // generates a random number between 0 and 1
console.log(Math.floor(Math.random() * 10)); // generates a random integer between 0 and 9

// 4 digit generated number
