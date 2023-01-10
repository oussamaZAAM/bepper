import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import { Footer } from './Components/Footer/Footer.js';
import Footer2 from './Components/Footer/Footer2';
import Main from './Components/Main/Main';
import Diets from './Components/Diets/Diets';
import Signup from "./Components/Singup";
import Login from "./Components/Login";
import EmailVerify from "./Components/EmailVerify";
import ForgotPassword from './Components/ForgotPassword';
import PasswordReset from "./Components/PasswordReset";
import { useCookies } from 'react-cookie';
import Test from './Components/Test/Test';

function App() {
  const [cookie, setCookie, removeCookie] = useCookies("token");
  const user = cookie.token;

  return (
    <BrowserRouter>
      <Navbar user={user}/>
      {/* <Navbar2 /> */}
      <Routes>
          <Route path='/' element={<Main />}/>
          <Route path='/test' element={<Test />}/>
          <Route path='/main' element={<Main />}/>
          <Route path='/diets' element={<Diets />}/>
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to='/' />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to='/' />} />
          <Route path="/users/:id/verify/:token" element={!user ? <EmailVerify /> : <Navigate to='/' />} />
          <Route path="/forgot-password" element={!user ? <ForgotPassword /> : <Navigate to='/' />} />
          <Route path="/password-reset/:id/:token" element={!user ? <PasswordReset /> : <Navigate to='/' />} />
          <Route path='*' element={<Navigate to='/' />} />
      </Routes>
      {/* <Screen /> */}
      <Footer />
      <Footer2 />
    </BrowserRouter>
  );
}

export default App;