const express = require('express');
const customersAPI = express.Router();
const pool = require('../config/db.js');

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
module.exports = customersAPI;