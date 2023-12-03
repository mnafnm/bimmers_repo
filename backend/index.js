const express = require('express');
const bodyParser = require('body-parser');
const customersAPI = require('./routes/customers.js');
const orderServicesAPI = require('./routes/OrderServices.js')
const pool = require('./config/db.js');
require('dotenv/config');
const cors = require('cors')

const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());
app.use('/', customersAPI, orderServicesAPI);

pool.getConnection((err,conn) => {
    if(conn)
    {
        console.log("Able to connect to database.")
    }
    else{
        console.log("Unable to connect to database.")
    }
    conn.release()
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
