import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import { Footer } from './Components/Footer/Footer.js';
import Footer2 from './Components/Footer/Footer2';
import Main from './Components/Main/Main';
import Diets from './Components/Diets/Diets';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      {/* <Navbar2 /> */}
      <Routes>
          <Route path='/' element={<Main />}/>
          <Route path='/main' element={<Main />}/>
          <Route path='/diets' element={<Diets />}/>
      </Routes>
      {/* <Screen /> */}
      <Footer />
      <Footer2 />
    </BrowserRouter>
  );
}

export default App;