import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
 const[jokes, setjokes] = useState([])

 useEffect(()=>{
  axios.get('/api/jokes')
  .then((response)=>{
    setjokes(response.data)
  }
  )
  .catch((error)=>{
    console.log(error)
  }
  )
 })

  return (
    <>
     <h1>Hello guys</h1>

     <p>Jokes: {jokes.length} </p>

     {
      jokes.map((jokes, index)=>(
        <div key={jokes.id} >
          <h3>{jokes.title}</h3>
          <h2>{jokes.joke}</h2>
        </div>
      ))
     }
    </>
  )
}

export default App
