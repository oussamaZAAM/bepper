import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import { Footer } from './Components/Footer/Footer.js';
import Footer2 from './Components/Footer/Footer2';
import Main from './Components/Main/Main';
import Diets from './Components/Diets/Diets';
import Signup from "./Components/Singup";
import Login from "./Components/Login";
import EmailVerify from "./Components/EmailVerify";

function App() {
	const user = localStorage.getItem("token");
  console.log(user)

  return (
    <BrowserRouter>
      <Navbar />
      {/* <Navbar2 /> */}
      <Routes>
          <Route path='/' element={<Main />}/>
          <Route path='/main' element={<Main />}/>
          <Route path='/diets' element={<Diets />}/>
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/signin" exact element={<Login />} />
          <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
      </Routes>
      {/* <Screen /> */}
      <Footer />
      <Footer2 />
    </BrowserRouter>
  );
}

export default App;