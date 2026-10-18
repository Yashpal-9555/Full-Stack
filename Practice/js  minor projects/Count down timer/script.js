const result = document.getElementById('result');


setInterval(()=>{

const currentdate = Date.now(); // gives current date in miliseconds

const olympictime = new Date(2028, 6 , 14).getTime();  // Give specific time in milli seconds

let remaining = olympictime-currentdate;

let day = Math.floor(remaining/(1000*60*60*24));
remaining%=1000*60*60*24;

let hours = Math.floor(remaining/(1000*60*60));
remaining%= 1000*60*60;

let minute = Math.floor(remaining/(1000*60));
remaining%=1000*60;

let second = Math.floor(remaining/1000);
remaining%= 1000;

result.textContent = `Days ${day} Hour: ${hours} Minute: ${minute}  Seconds: ${second}`;

},1000)
