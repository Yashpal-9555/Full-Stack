// object
// object is a collection of properties
// properties are key-value pairs

const user = {
    name :20,
    emailId : "abc@gmail.com",
    amount : 500
}

console.log(user);

// Accessing object properties
console.log(user.name);

// Modifying object properties
user.name = `YK`;
console.log(user.name);

// delete 
delete user.amount;
console.log(user);

for (let key in user) {
    console.log(key, user[key]);
}

// Destructuring
const {name, emailId} = user;
console.log(name, emailId);

const ar = [10,20,30,40];
const[first, second] = ar;
console.log(first, second);

// Destructuring with alias
const {name: userName, emailId: userEmail} = user;
console.log(userName, userEmail);

// Important
console.log(Object.keys(user));  // Used to get all the keys of an object
console.log(Object.values(user)); // Used to get all the values of an object
console.log(Object.entries(user)); // Used to get all the key-value pairs of an object in the form of an array of arrays


// Functions inside object
const user1 = {
    name : "John",
    greeting : function() {
        console.log(`Hello ${this.name}`);
        return 20;
    }
}
user.greeting(); // Hello John
const va = user.greeting();

// Independent copy of the function works for one level not nested
const user2 = {...user1};
user2.name = "Jane";
user2.greeting(); // Hello Jane


// Deep copy
const user3 = structuredClone(user1);
user3.name = "Jack";
user3.greeting(); // Hello Jack



