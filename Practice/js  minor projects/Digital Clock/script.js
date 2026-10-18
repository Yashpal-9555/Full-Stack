const div = document.querySelector('div');
setInterval(()=>{


let time = new Date();  // fetches time from local pc
div.textContent = time.toLocaleTimeString();

},1000)  // Time in milisecond executes the code in set interval of time


