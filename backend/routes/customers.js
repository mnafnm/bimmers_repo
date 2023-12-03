const express = require('express');
const customersAPI = express.Router();
const pool = require('../config/db.js');
const VehicleModels =  require('../models/vehicleModels.js')
const {AddNewCustomer, LookUpDataModel} = require('../models/customerModels.js')

customersAPI.get('/getCustomerInfoPhoneNumber/', async (req, res) => {
    pool.getConnection((err,conn) => {
        if(conn)
        {
            var phoneNumber = req.query.Criteria;
            
            var query = `SELECT  
            c.CUSTOMER_LAST_NAME, c.CUSTOMER_FIRST_NAME, 
            c.CUSTOMER_STREET, c.CUSTOMER_CITY, 
           c.CUSTOMER_STATE, c.CUSTOMER_ZIPCODE, c.CUSTOMER_PRIMARY_PHONE, 
           c.ALTERNATE_PHONE, c.CUSTOMER_EMAIL,
           c.CUSTOMER_NOTES
           FROM bimmers_data.customers c
           WHERE c.ALTERNATE_PHONE = ?
           OR c.CUSTOMER_PRIMARY_PHONE = ?`
           

            conn.query(query,[phoneNumber, phoneNumber], function (error, results, fields){
                if (error) throw error;
               
                res.json(results)
               
            })
            
        }
        conn.release()
    });
});

customersAPI.get('/getCustomerInfoFLName/', async (req, res) => {
    pool.getConnection((err,conn) => {
        if(conn)
        {
    
            var name = req.query.Criteria;

            var query = `SELECT 
            c.CUSTOMER_LAST_NAME, c.CUSTOMER_FIRST_NAME, 
            c.CUSTOMER_STREET, c.CUSTOMER_CITY, 
           c.CUSTOMER_STATE, c.CUSTOMER_ZIPCODE, c.CUSTOMER_PRIMARY_PHONE, 
           c.ALTERNATE_PHONE, c.CUSTOMER_EMAIL,
           c.CUSTOMER_NOTES
           FROM bimmers_data.customers c
           WHERE c.CUSTOMER_LAST_NAME = ?
           OR c.CUSTOMER_FIRST_NAME = ?`

            conn.query(query,[name,name], function (error, results){
                if (error) throw error;
               
                res.json(results)
               
            })
            
        }
        conn.release()
    });
});

customersAPI.get('/getCustomers', async (req, res) => {
    pool.getConnection((err,conn) => {
        if(conn)
        {
    
            var name = req.query.Criteria;

            var query = `SELECT c.CUSTOMER_ID,
            c.CUSTOMER_LAST_NAME, c.CUSTOMER_FIRST_NAME, 
            c.CUSTOMER_STREET, c.CUSTOMER_CITY, 
           c.CUSTOMER_STATE, c.CUSTOMER_ZIPCODE, c.CUSTOMER_PRIMARY_PHONE, 
           c.ALTERNATE_PHONE, c.CUSTOMER_EMAIL,
           v.MODEL, v.COLOR, v.MAKE, v.PRODUCTION_DATE, v.LICENSE_PLATE, v.VIN
           FROM bimmers_data.customers c, bimmers_data.vehicle_info v
		   Where c.CUSTOMER_ID = v.CUSTOMER_ID AND c.CUSTOMER_ID > '12600'`

            conn.query(query,[name,name], function (error, results){
                if (error) throw error;
               
                res.json( results)
            })
            
        }
        conn.release()
    });
});


customersAPI.post('/registerCustomer', async (req, res) => {
    pool.getConnection((err,conn) => {
        if(conn)
        {
   
            var customerInfo = req.body.customerInfo
            const customerInfoArray = Object.keys(customerInfo).map(key => customerInfo[key]);
            var vehicleInfo = req.body.vehicleInfo
            const vehicleInfoArray = Object.keys(vehicleInfo).map(key => vehicleInfo[key]);
          
            var customerQuery = `INSERT INTO customers (CUSTOMER_LAST_NAME, CUSTOMER_FIRST_NAME, 
                CUSTOMER_COMPANY_NAME, CUSTOMER_STREET, CUSTOMER_CITY, CUSTOMER_STATE, CUSTOMER_ZIPCODE, 
                CUSTOMER_PRIMARY_PHONE, ALTERNATE_PHONE, WORK_PHONE, EXTENSION, ADDITIONAL_CONTACT, 
                ADDITIONAL_CONTACT_PHONE, CUSTOMER_EMAIL, TAX_EXEMPT_NOTES, CUSTOMER_NOTES) VALUES (?);`

            conn.query(customerQuery,[customerInfoArray], (error, results)=>{
                if (error) throw error ;
                
                 
            vehicleInfo.CUSTOMER_ID = results.insertId;
            const vehicleInfoArray = Object.keys(vehicleInfo).map(key => vehicleInfo[key]);
            var vehicleQuery = `INSERT INTO vehicle_info VALUES (?);`
                
            conn.query(vehicleQuery,[vehicleInfoArray],  (error, results)=>{
                if (error) throw error;
               
            })
                
            res.json(results)
            })

            
            
        }
        conn.release()
    });
});

customersAPI.post('/deleteCustomer', async (req, res) => {
    pool.getConnection((err,conn) => {
        if(conn)
        {
    
            var customerID = req.body.customerID

            var query = `DELETE FROM vehicle_info
            WHERE CUSTOMER_ID = ?;`

            conn.query(query,[customerID], function (error, results){
                if (error) throw error;
               
            })

            var query = `DELETE FROM customers
            WHERE CUSTOMER_ID = ?;`

            conn.query(query,[customerID], function (error, results){
                if (error) throw error;
               
                res.json(results)
            })

            
            
        }
        conn.release()
    });
});


module.exports = customersAPI;