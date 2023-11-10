const express = require('express');
const bodyParser = require('body-parser');
const routesHandler = require('./routes/handler.js');
const pool = require('./config/db.js');
require('dotenv/config');

const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/', routesHandler);

const testCustomerID = 17010; // this will need to be dynamic and unique
const vehicleVIN = 123481; // no customer can have the same VIN

// my DB functions
function addCustomer(customerID, customerLastName) {
    pool.getConnection((err,conn) => {
        if (err) throw err;
        
        const qry_customers = 'INSERT INTO customers(customer_id, customer_last_name) VALUES(?,?)';
        conn.query(qry_customers, [customerID, customerLastName], (err,result) => {
            if (err) throw err;
            console.log(result);
        });
        conn.release();
    });
}

function addVehicle(customerID, vinNumber){
    pool.getConnection((err,conn) => {
        if (err) throw err;
        
        const qry_vehicle = 'INSERT INTO vehicle_info (vin, customer_id) VALUES (?,?)';
        conn.query(qry_vehicle, [vinNumber, customerID], (err,result) => {
            if (err) throw err;
            console.log(result);
        });
        conn.release();
    });
}

/*
if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'frontend/build')));

    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, 'frontend/build', routesHandler));
    });
}
*/

const PORT = process.env.PORT || 4000; // backend routing port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

addCustomer(testCustomerID, "Reeves");
addVehicle(testCustomerID, vehicleVIN);