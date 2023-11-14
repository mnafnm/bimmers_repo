import { useEffect, useState } from "react"
import axios from 'axios'
export default Repair_order;

function Repair_order() {
  const [Customers, setCustomer] = useState({});

    return (
    <div className="Repair_order">
      <h1>Repair Orders</h1>
      <p>{Customers.CUSTOMER_LAST_NAME}</p>
      </div>)
  };

