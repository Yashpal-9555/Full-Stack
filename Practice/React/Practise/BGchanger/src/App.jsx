import { useState } from "react";

function App() {
 
const[color, setColor] = useState("#f2f6fc");
  return (
    <>
    <div className="w-full h-screen duration-200" style={{backgroundColor:color}}> </div>

    <div className="fixed bottom-0 left-0 w-full flex flex-row items-center justify-center gap-4 p-4">
      
      <button onClick={()=>{setColor("#92bafc")}} className="relative z-0 rounded bg-blue-500 px-10 py-3 transition-[all_0.3s_ease] after:absolute after:left-0 after:top-0 after:-z-10 after:h-full after:w-0 after:rounded after:bg-pink-700 after:transition-[all_0.3s_ease]  hover:after:w-full ">
      Button
    </button>

    <button onClick={()=>{setColor("#a4fac4")}} className="relative z-0 rounded bg-green-400 px-10 py-3 transition-[all_0.3s_ease] after:absolute after:left-0 after:top-0 after:-z-10 after:h-full after:w-0 after:rounded after:bg-pink-700 after:transition-[all_0.3s_ease]  hover:after:w-full ">
      Button
    </button>

    <button onClick={()=>{setColor("#f9abab")}} className="relative z-0 rounded bg-red-400 px-10 py-3 transition-[all_0.3s_ease] after:absolute after:left-0 after:top-0 after:-z-10 after:h-full after:w-0 after:rounded after:bg-pink-700 after:transition-[all_0.3s_ease]  hover:after:w-full ">
      Button
    </button>

    <button onClick={()=>{setColor("#d9b7fc")}} className="relative z-0 rounded bg-violet-300 px-10 py-3 transition-[all_0.3s_ease] after:absolute after:left-0 after:top-0 after:-z-10 after:h-full after:w-0 after:rounded after:bg-pink-700 after:transition-[all_0.3s_ease]  hover:after:w-full ">
      Button
    </button>

    <button onClick={()=>{setColor("#e9f2cf")}} className="relative z-0 rounded bg-yellow-200 px-10 py-3 transition-[all_0.3s_ease] after:absolute after:left-0 after:top-0 after:-z-10 after:h-full after:w-0 after:rounded after:bg-pink-700 after:transition-[all_0.3s_ease]  hover:after:w-full ">
      Button
    </button>

    <button onClick={()=>{setColor("#fd95d9")}} className="relative z-0 rounded bg-pink-100 px-10 py-3 transition-[all_0.3s_ease] after:absolute after:left-0 after:top-0 after:-z-10 after:h-full after:w-0 after:rounded after:bg-pink-700 after:transition-[all_0.3s_ease]  hover:after:w-full ">
      Button
    </button>

    </div>
    </>
  )
}

export default App
