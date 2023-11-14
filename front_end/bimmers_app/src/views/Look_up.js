import { useEffect, useState } from "react"
import axios from 'axios'
import { Button, TextField } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default Look_up;


function Look_up() {
  const [Customers, setCustomers] = useState([]);
  const [Criteria, setCriteria] = useState("");
  const [Rows, setRows] = useState([]);
  const [CriteriaValue, setCriteriaValue] = useState("");
  const regExp = /[a-zA-Z]/g;
  const onSerachCriteriaChange = (e) =>{
  
    if(!isNaN(e.target.value) && e.target.value.length == 3 )
    {
      console.log(e.target.value)
      document.getElementById("criteria").value = "(" + e.target.value + ") ";
    } 
    else if(e.target.value.length == 9)
    {
      var regExp = /[a-zA-Z]/g;
      if(!regExp.test(e.target.value))
      {
        document.getElementById("criteria").value = e.target.value + "-";
      }
    }
    
    setCriteria(e.target.value)
    
  }

  const searchCriteria = async () =>{
    if(isNaN(Criteria) && regExp.test(Criteria))
    {
      const response = await axios.get("http://localhost:4000/getCustomerInfoFLName/", {params: {Criteria}})
      setCustomers(response.data)
    
    } else if(!regExp.test(Criteria))
      {
        const response = await axios.get("http://localhost:4000/getCustomerInfoPhoneNumber/", {params: {Criteria}})
      setCustomers(response.data)
      }


      setRows([])
      Customers.map((info)=>{
        setRows(Rows=>[...Rows,createData(info.CUSTOMER_LAST_NAME, info.CUSTOMER_FIRST_NAME, info.CUSTOMER_STREET, 
          info.CUSTOMER_CITY, info.CUSTOMER_STATE, info.CUSTOMER_ZIPCODE, 
          info.CUSTOMER_PRIMARY_PHONE, info.ALTERNATE_PHONE, info.CUSTOMER_EMAIL, info.CUSTOMER_NOTES)])
      })
  }


  function createData(CUSTOMER_LAST_NAME, CUSTOMER_FIRST_NAME, CUSTOMER_STREET, 
    CUSTOMER_CITY, CUSTOMER_STATE, CUSTOMER_ZIPCODE, 
    CUSTOMER_PRIMARY_PHONE, ALTERNATE_PHONE, CUSTOMER_EMAIL, CUSTOMER_NOTES) {
    return { CUSTOMER_LAST_NAME, CUSTOMER_FIRST_NAME, CUSTOMER_STREET, 
      CUSTOMER_CITY, CUSTOMER_STATE, CUSTOMER_ZIPCODE, CUSTOMER_PRIMARY_PHONE,
       ALTERNATE_PHONE, CUSTOMER_EMAIL, CUSTOMER_NOTES };
  }


    return (
    <div className="Look_up">
      <h1>CUSTOMER LOOK UP</h1>
      <TextField id="criteria" label="Search Customer" variant="outlined"  onChange={onSerachCriteriaChange} />
      <Button variant="contained" onClick={searchCriteria}>Search</Button>
      <br/>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Last Name</TableCell>
            <TableCell >First Name</TableCell>
            <TableCell >Street</TableCell>
            <TableCell >City</TableCell>
            <TableCell >State</TableCell>
            <TableCell >ZipCode</TableCell>
            <TableCell >Primary Number</TableCell>
            <TableCell >Alternate Number</TableCell>
            <TableCell >Email</TableCell>
            <TableCell >Notes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Rows.map((row) => (
            <TableRow
              key={Math.random()}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.CUSTOMER_LAST_NAME}
              </TableCell>
              <TableCell >{row.CUSTOMER_FIRST_NAME}</TableCell>
              <TableCell >{row.CUSTOMER_STREET}</TableCell>
              <TableCell >{row.CUSTOMER_CITY}</TableCell>
              <TableCell >{row.CUSTOMER_STATE}</TableCell>
              <TableCell >{row.CUSTOMER_ZIPCODE}</TableCell>
              <TableCell >{row.CUSTOMER_PRIMARY_PHONE}</TableCell>
              <TableCell >{row.ALTERNATE_PHONE}</TableCell>
              <TableCell >{row.CUSTOMER_EMAIL}</TableCell>
              <TableCell >{row.CUSTOMER_NOTES}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

      </div>)
  };