const express = require('express');
const orderServicesAPI = express.Router();
const pool = require('../config/db.js');




orderServicesAPI.post('/saveRepairOrder', async (req, res) => {
    pool.getConnection((err,conn) => {
        if(conn)
        {

            var r = req.body.order

            var service= {
                workOrderID: r.invoiceNumber,
                VIN: r.VIN,
                CUSTOMER_ID: r.CUSTOMER_ID
            };
            
            
            const serviceArray = Object.keys(service).map(key => service[key]);
        
        var serviceQuery = `INSERT INTO service_records (REPAIR_ORDER_ID, VIN, CUSTOMER_ID) VALUES (?);`
            
        conn.query(serviceQuery,[serviceArray],  (error, results)=>{
            if (error) throw error;

            
            var order = {
                
                id: r.invoiceNumber,
                worknum: Math.floor(Math.random() * 100000) + 1,
                emnum: 1,
                repairDes: JSON.stringify(r.descriptions),
                mechNotes: r.mechanicNotes,
                recServ: r.recommendedServices
            };
            

            const orderArray = Object.keys(order).map(key => order[key]);
          
            var orderQuery = `INSERT INTO work_detail (
                REPAIR_ORDER_ID,WORKLINE_NUMBER, EMPLOYEE_NUMBER,PROBLEM_DESCRIPTION,REPAIR_ACTION, RECOMMENDED_SERVICES) VALUES (?);`

            conn.query(orderQuery,[orderArray], (error, results)=>{
                if (error) throw error ;
                
                

                
                
            
            })
            res.json(results)
        })
        }
        conn.release()
    });
});

module.exports = orderServicesAPI;