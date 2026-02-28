import React from 'react'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom"
import Home from './pages/Home'
import useGetCurrentUser from './hooks/useGetCurrentUser'
import { useSelector } from 'react-redux'
import Dashboard from './pages/Dashboard'
import Generate from './pages/Generate'
import WebsiteEditor from './pages/Editor'
import LiveSite from './pages/LiveSite'
import Pricing from './pages/Pricing'
import Login from './pages/Login'
import Register from './pages/Register'


function App() {
  useGetCurrentUser()
  const {userData}=useSelector(state=>state.user)
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/login' element={!userData?<Login/>:<Navigate to='/'/>}/>
    <Route path='/register' element={!userData?<Register/>:<Navigate to='/'/>}/>
    <Route path='/dashboard' element={userData?<Dashboard/>:<Navigate to='/login'/>}/>
     <Route path='/generate' element={userData?<Generate/>:<Navigate to='/login'/>}/>
     <Route path='/editor/:id' element={userData?<WebsiteEditor/>:<Navigate to='/login'/>}/>
      <Route path='/site/:id' element={<LiveSite/>}/>
       <Route path='/pricing' element={<Pricing/>}/>
   </Routes>
   </BrowserRouter>
  )
}

export default App
