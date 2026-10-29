import {Routes, Route, Navigate} from 'react-router-dom'

import HomeLayout from '../Layouts/HomeLayout'
import ProfileLayout from '../Layouts/ProfileLayout'

import About from '../Pages/Home/About'
import Contact from '../Pages/Home/Contact'
import Info from '../Pages/Home/Info'

import Detail from '../Pages/Profile/Detail'
import Summary from '../Pages/Profile/Summary'

import NotFound from '../Pages/NotFound'

export default function Approute(){
   
    return (
        <Routes>

{/* This line redirects host to /home/about page whenever he is visiting site */}
        <Route path='/' element={<Navigate to="/home/about" replace/>}/>

        {/*Routing To HomeLayout */}
        <Route path='/home' element={<HomeLayout/>}>

        {/* Index Routing To Parent Without Child */}
            <Route index element={<Navigate to="about" replace/>}/>

        {/*Routing To Components Of HomeLayout */}
            <Route path='contact' element={<Contact/>}/>
            <Route path='about' element={<About/>}/>
            <Route path='info' element={<Info/>}/>
        </Route>


{/* Routing To ProfileLayout*/} 
        <Route path='/profile' element={<ProfileLayout/>}>

{/*Index Routing To Parent Route */}
{/* Here replace Replaces current browser history */}
        <Route index element={<Navigate to="detail" replace/>}/>

{/*Routing Within ProfileLayout */}

        <Route path='detail' element={<Detail/>}/>
        <Route path='summary' element={<Summary/>}/>

        </Route>

        <Route path='*' element={<NotFound/>}/>


 </Routes>
 
    );

}

