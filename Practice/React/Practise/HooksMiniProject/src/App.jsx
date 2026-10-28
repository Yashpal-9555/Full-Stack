import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberallowed, setNumberAllowed] = useState(false)
  const [special, setSpecial] = useState(false)
  const [password, setPassword] = useState("")


  // ref hook
  const passwordref = useRef(null)

  const passwordGenerator = useCallback(()=>{
    
   let pass=""
   let str="ABCDEFGHIJKLMNOPQRSTUVWXYXabcdefghijklmnopqrstuvwxyz"

    if(numberallowed) str+="0123456789"
    if(special) str+="!#$^&()}{[]"

    for(let i=1; i<=length; i++){
    let char = Math.floor(Math.random() * str.length +1)
    pass += str.charAt(char)
    }
    setPassword(pass)

  },[length, numberallowed, special, setPassword])

  const copyPasswordToClipboard = useCallback(()=>{
    passwordref.current?.select()
    passwordref.current?.setSelectionRange(0,24)
    window.navigator.clipboard.writeText(password) 
  },[password])

  useEffect(()=>{
    passwordGenerator()
  },[length, numberallowed, special, setPassword, passwordGenerator])

  return (
    <>
     
     <div className="min-h-screen flex items-center justify-center bg-gray-900">

  <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-400 bg-gray-600">

    <h1 className="text-4xl text-white text-center pb-2">
      Password Generator
    </h1>

    <div className="flex shadow rounded-lg overflow-hidden mb-4">
      <input
        type="text"
        value={password}
        className="outline-none w-full py-1 px-3 bg-white"
        placeholder="Password"
        readOnly
        ref = {passwordref}
      />

      <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-400 rext-white px-3 py0.5 shrink-0' >COPY</button>
    </div>

    <div className='flex text-sm gap-x-2 pb-1'>
      <div className='flex items-center gap-x-1'>
        <input type="range"
        min={8}
        max={24}
        value={length}
        className='cursor-pointer'
        onChange={(e)=>{setLength(e.target.value)}}
        />
        <label>Length : {length}</label>
      </div>

      <div className='flex items-center gap-x-1 pb-1'> 
        <input
        type="checkbox"
        defaultChecked={numberallowed}
        id='numberInput'
        onChange={()=>{
          setNumberAllowed((prev)=> !prev);
        }}
        />
        <label htmlFor='numberInput'>Numbers</label>
      </div>

      <div className='flex items-center gap-x-1 pb-1'> 
        <input
        type="checkbox"
        defaultChecked={special}
        id='characterInput'
        onChange={()=>{
          setSpecial((prev)=> !prev);
        }}
        />
        <label htmlFor='characterInput'>Characters</label>
      </div>

    </div>

  </div>
</div>
    </>
  )
}

export default App
