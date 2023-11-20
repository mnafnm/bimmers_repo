import './App.css';
import Navbar from './views/Navbar';
import Home from './views/Home';
import RepairOrder from './views/RepairOrder';
import Invoices from './views/Invoices';
import {Route, Routes} from "react-router-dom";
import React from 'react';
import CheckIn from './views/CheckIn';
import LookUp from './views/LookUp';



function App() {
  return (
   <>
    <Navbar/>
    <div className='w-full flex-col justify-center items-center px-10 md:px-40'>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/CheckIn" element={<CheckIn/>}/>
        <Route path="/LookUp" element={<LookUp/>}/>
        <Route path="/RepairOrder/" element={<RepairOrder/>}/>
        <Route path="/Invoices" element={<Invoices/>}/>
        
      </Routes>
    </div>
   </>
  )
}

export default App;
