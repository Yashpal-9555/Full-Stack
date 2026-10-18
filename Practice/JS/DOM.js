// Create Element in js
const newEl = document.createElement("h2");
newEl.textContent = "Strike";
newEl.id= "third";
//console.log(newEl);

// Select element
const ele = document.getElementById("second");
// putting newEl after <h2> having id second
ele.after(newEl);

const newElement2 = document.createElement("h3");
newElement2.textContent = "I am Learning";
newElement2.id = "forth";
// newElement2.className= " heading";
// You should use classlist to assign multiple classes to element
newElement2.classList.add("diwali");
newElement2.classList.add("holi");
// Removing class
newElement2.classList.remove("holi");
console.log(newElement2);

const ele2= document.getElementById("third");
ele2.before(newElement2);

// Putting element in a list
 const list = document.createElement("li");
 list.textContent = "milk";

 const list2 = document.createElement("li");
 list2.textContent = "cake";

 const ulel = document.getElementById("listing");
 ulel.append(list);
 ulel.prepend(list2); // To insert at start of list

 const list3 = document.createElement("li");
 list3.textContent=("Rabdi"); 

 // To add in after any list element
 ulel.children[1].after(list3);

 // add in list
 const arr = ["tofu", "tea", "jalebi"];
 for(let food of arr){
    const listt = document.createElement("li");
    listt.textContent = food;
    ulel.append(listt);
 }

 // Optimised way
 const fragment = document.createDocumentFragment();
 for (let food of arr){
    const lisst = document.createElement("li");
    lisst.textContent = food;
    fragment.append(lisst);
 }
 ulel.append(fragment);

 // remove element

 const s1 = document.getElementById("second");
 s1.remove();




 
 
