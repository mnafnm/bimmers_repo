import logo from './logo.svg';
import './App.css';
import Navbar from './views/Navbar';
import Home from './views/Home';
import Check_in from './views/Check_in';
import Repair_order from './views/Repair_order';
import Invoices from './views/Invoices';
import {Route, Routes} from "react-router-dom"
import React, {Component} from 'react'


function App() {
  return (
   <>
    <Navbar/>
    <div className='container'>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/check_in" element={<Check_in/>}/>
        <Route path="/repair_order" element={<Repair_order/>}/>
        <Route path="/invoices" element={<Invoices/>}/>
        
      </Routes>
    </div>
   </>
  )
}





export default App;
