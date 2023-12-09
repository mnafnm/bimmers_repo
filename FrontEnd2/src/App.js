import './App.css';
import Navbar from './views/Navbar';
import Home from './views/Home';
import RepairOrder from './views/RepairOrder';
import Invoices from './views/Invoices';
import { Route, Routes } from "react-router-dom";
import React from 'react';
import CheckIn from './views/CheckIn';
import LookUp from './views/LookUp';
import NewOrder from './views/NewOrder';
import Orders from './views/Orders';
import CreateInvoice from './views/CreateInvoice';
import { ToastContainer } from 'react-toastify';
import EditOrders from './views/EditOrders';
import EditRepairOrder from './views/EditRepairOrder';

function App() {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <div className='w-full flex-col justify-center items-center px-10 md:px-40'>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/CheckIn" element={<CheckIn />} />
          <Route path="/Orders" element={<Orders />} />
          <Route path="/Orders/edit/:id" element={<EditOrders />} />
          <Route path="/LookUp" element={<LookUp />} />
          <Route path="/CreateInvoice/" element={<CreateInvoice />} />
          <Route path="/RepairOrder/" element={<RepairOrder />} />
          <Route path="/RepairOrder/edit/:id" element={<EditRepairOrder />} />
          <Route path="/Invoices" element={<Invoices />} />
          <Route path="/neworder" element={<NewOrder />} />
        </Routes>

        
      </div>
    </>
  )
}

export default App;
