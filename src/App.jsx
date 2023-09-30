import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignUp from './Pages/SignUp'
import Login from './Pages/Login';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import Header from './components/Header';

export default function App() {
  // return (
  //   <p className="text-red-500">I am saad </p>
  // )

    return <BrowserRouter>
    <Header />
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/sign-in' element={<Login />}></Route>
      <Route path='/sign-up' element={<SignUp />}></Route>
      <Route path='/profile' element={<Profile />}></Route>
    </Routes>
    
    </BrowserRouter>
}