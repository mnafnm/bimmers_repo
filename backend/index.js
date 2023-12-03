const express = require('express');
const bodyParser = require('body-parser');
const customersAPI = require('./routes/customers.js');
const orderServicesAPI = require('./routes/OrderServices.js')
const pool = require('./config/db.js');
require('dotenv/config');
const cors = require('cors');
const inventoryServicesAPI = require('./routes/inventoryItems.js');

const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());
app.use('/', customersAPI, orderServicesAPI,inventoryServicesAPI);

pool.getConnection((err,conn) => {
    if(conn)
    {
        console.log("Able to connect to database.")
    }
    else{
        console.log("Unable to connect to database.")
        console.log(err)
    }
    // conn.release()

});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
