import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
 



  return (
    <>
      <h1> Counter increaser</h1>
      <button onClick={()=>setCount(prev=> prev <20 ? prev+1 : 20)}> Increase count</button>

      <button onClick={()=>setCount(prev => prev>0 ? prev-1 : 0)}>Decrease count</button>

      <h3>{count}</h3>
    </>
  )
}

export default App
