import { useEffect, useState } from "react"
import axios from 'axios'
export default Look_up;


function Look_up() {
  const [Customers, setCustomer] = useState({});

  useEffect(()=>{
    axios.get("http://localhost:4000/getRepairOrderByPhone/(636) 227-3815").then((response)=>{
    console.log(response.data);
    setCustomer(response.data);
    });
  }, []);
    return (
    <div className="Look_up">
      <h1>Look_up</h1>
      <th>{Customers.CUSTOMER_LAST_NAME}</th>
      </div>)
  };