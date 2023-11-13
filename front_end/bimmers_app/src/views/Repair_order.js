import { useEffect, useState } from "react"
import axios from 'axios'
export default Repair_order;

function Repair_order() {
  const [Customers, setCustomer] = useState({});

  useEffect(()=>{
    axios.get("http://localhost:4000/getRepairOrderByPhone/(636) 227-3815").then((response)=>{
    console.log(response.data);
    setCustomer(response.data);
    });
  }, []);
    return (
    <div className="Repair_order">
      <h1>Repair Orders</h1>
      <p>{Customers.CUSTOMER_LAST_NAME}</p>
      </div>)
  };

