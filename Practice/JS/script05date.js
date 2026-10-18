// Date

const now = new Date();
console.log(now); // Current date and time according to the UTC timezone
console.log(now.toString()); // Current date and time according to the local timezone
console.log(now.toISOString()); // Current date and time in ISO format
console.log(now.toLocaleDateString()); // Current date in local format

console.log(now.getFullYear()); // Current year
console.log(now.getMonth()); // Current month (0-11)
console.log(now.getDate()); // Current day of the month (1-31)
console.log(now.getDay()); // Current day of the week (0-6)
console.log(now.getHours()); // Current hour (0-23)
console.log(now.getMinutes()); // Current minute (0-59)
console.log(now.getSeconds()); // Current second (0-59)

// year, month, day, hour, minute, second
const specificDate = new Date(2023, 5, 18, 10, 30, 0);

const date = Date.now(); // Current timestamp in milliseconds
// timestamp is the number of milliseconds since January 1, 1970, 00:00:00 UTC