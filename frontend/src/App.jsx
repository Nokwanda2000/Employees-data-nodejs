import React, { useState, useEffect } from 'react';
import EmployeeList from './components/employeescard';
import EmployeeForm from './components/register';
import SearchBar from './components/search';
import Layout from './pages/layoutpage';
import Employeespage from './pages/employeespage';
import Footer from './components/Footer';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Landingpage from './pages/landingpage';
import Registerpage from './pages/registerpage';

function App() {

  return (
    <>  
      
<BrowserRouter>
<Layout /> 
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/registerpage" element={<Registerpage />} />
        <Route path="/employeespage" element={<Employeespage />} />
  
      </Routes>

      <Footer/>
    </BrowserRouter>

    </>


  );
}

export default App;
