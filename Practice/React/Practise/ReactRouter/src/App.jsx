import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import Home from './Components/Home/Home'
import About from './Components/About/About'
import Contact from './Components/Contact/Contact'
import User from './Components/User/User'

function App() {
  

  return (
    <>
     <BrowserRouter>
        <Header/>
      
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/contact" element={<Contact/>}/>
             <Route path='/user/:userid' element={<User/>}/>
        </Routes>

        <Footer/>
     </BrowserRouter>
    </>
  )
}

export default App
