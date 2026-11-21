const taskInput = document.getElementById("inputbox")
const addButton= document.getElementById("btn")
const todolist= document.querySelector("#todo-list")
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const Allbtn = document.getElementById("all-btn");
const Activebtn = document.getElementById("active-btn");
const Completedbtn = document.getElementById("completed-btn");

const clear = document.getElementById('Clear-completed');

const msg = document.getElementById("taskcount");
let count;



/*  Functionality to add a task */
addButton.addEventListener('click', function(){
   
   const task=  taskInput.value.trim();
    if(task === ""){
    return;
   } 
   const newTask = {
    text: task,
    completed: false
};

tasks.push(newTask);
localStorage.setItem("tasks", JSON.stringify(tasks));

displayTask(newTask);

})





/* Functionality to display Added tasks */
function displayTask(task){

    const li = document.createElement("li");
    const taskText = document.createElement("span");

   taskText.textContent= task.text;
    li.append(taskText);


   if (task.completed) {
    li.classList.add("completed");
}
   todolist.append(li);
   taskInput.value="";

    const checkbox = document.createElement("input");
    checkbox.type="checkbox";
    checkbox.checked = task.completed;
     li.append(checkbox);

   



checkbox.addEventListener('change', function(){
    task.completed = checkbox.checked;

    li.classList.toggle("completed", task.completed);

    localStorage.setItem("tasks", JSON.stringify(tasks));
    count = tasks.filter(task=>!task.completed).length
        msg.textContent=`Active tasks are ${count}`;
    
})



const deleteButton = document.createElement("button")
deleteButton.textContent="Delete";
li.append(deleteButton);


deleteButton.addEventListener('click', function(){
 li.remove();

    const index = tasks.indexOf(task);

    if (index !== -1) {
        tasks.splice(index, 1);
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
    count = tasks.filter(task=>!task.completed).length
        msg.textContent=`Active tasks are ${count}`;
});





const editButton = document.createElement('button')
editButton.textContent="Edit";
li.append(editButton);



editButton.addEventListener("click", function() {
    const updatedText = prompt("Edit your task:", task.text);

    if (updatedText !== null && updatedText.trim() !== "") {
    task.text = updatedText.trim();
    taskText.textContent = task.text;
    localStorage.setItem("tasks", JSON.stringify(tasks));

    
    

}
});

}



/* Functionality to Filter tasks */


 function filterTasks(condition){
        document.getElementById("todo-list").innerHTML = ""
        let filteredtask;
        count = tasks.filter(task=>!task.completed).length
        msg.textContent=`Active tasks are ${count}`;

        if(condition==="All"){
            filteredtask = tasks
        }
        else if(condition==="Active"){
            filteredtask =  tasks.filter(task=> !task.completed)
            
        }

        else{
            
             filteredtask =  tasks.filter(task=> task.completed)
        }
        filteredtask.forEach(function(task) {
    displayTask(task);
});
 }




Allbtn.addEventListener('click', function(){
        filterTasks('All')
})


Activebtn.addEventListener('click' , function(){
    filterTasks('Active')
})


Completedbtn.addEventListener('click', function(){
    filterTasks('Completed')
})



clear.addEventListener('click',function(){
    tasks = tasks.filter(task=>!task.completed)
    localStorage.setItem("tasks", JSON.stringify(tasks));
    filterTasks('All')
    
})



tasks.forEach(function(task) {
    displayTask(task);
});
