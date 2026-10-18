function handleClick(){
   const element =  document.getElementById("second");
   element.textContent = ("is coming on friday");
} // function for onclick eventlistener
// Event are actions performed by mouse like hover, click , double click etc

// Another way for performing eventlistener 
const ele = document.getElementById("third");
ele.onclick = function handleClick(){
    ele.textContent = "When strike coming";
}

//Best way to use
// Can use multiple event on single element
const elem = document.getElementById("first");
 elem.addEventListener('click',()=>{
   elem.textContent = "Strike coming soon";
 })

 elem.addEventListener('dblclick',()=>{
   elem.style.backgroundColor = "grey";
 })
 // e.target
const child1 = document.getElementById("parent");
child1.addEventListener('click', (e)=>{
   e.target.textContent = " clicked";
})

// Better way
//  const parent = document.getElementById("parent");
//  for(let child of parent.children){
//     child.addEventListener('click', ()=>{
//         child.textContent = " I am clicked";
//     })
//  }

// Best approach bubbling
 const grand = document.getElementById("grand");
 grand.addEventListener('click', (e)=>{
    console.log("Grandparent clicked");
    console.log(e);
 },true)

 const parnt = document.getElementById("parant");
 parnt.addEventListener('click', ()=>{
    console.log("parent clicked");
 },true)

 const child = document.getElementById("children");
 child.addEventListener('click', ()=>{
    console.log("children clicked");
 },true)

// e.target

//Remove eventListener
