import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useCookies } from 'react-cookie';

//Components
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
import CompleteLogin from './Components/EmailVerify/CompleteLogin';
import Settings from './Components/Settings/Settings';

//Styles
import './App.css';

function App() {
  const [cookie] = useCookies("token");
  const token = cookie.token;

  return (
    <BrowserRouter>
      <Navbar user={token}/>
      {/* <Navbar2 /> */}
      <Routes>
          <Route path='/' element={<Main />}/>
          <Route path='/main' element={<Main />}/>
          <Route path='/diets' element={<Diets />}/>
          <Route path="/settings" element={token ? <Settings /> : <Navigate to='/' />} />
          <Route path="/completelogin" element={token ? <CompleteLogin /> : <Navigate to='/' />} />
          <Route path="/signup" element={!token ? <Signup /> : <Navigate to='/' />} />
          <Route path="/login" element={!token ? <Login /> : <Navigate to='/' />} />
          <Route path="/users/:id/verify/:token" element={!token ? <EmailVerify /> : <Navigate to='/' />} />
          <Route path="/forgot-password" element={!token ? <ForgotPassword /> : <Navigate to='/' />} />
          <Route path="/password-reset/:id/:token" element={!token ? <PasswordReset /> : <Navigate to='/' />} />
          <Route path='*' element={<Navigate to='/' />} />
      </Routes>
      {/* <Screen /> */}
      <Footer />
      <Footer2 />
    </BrowserRouter>
  );
}

export default App;