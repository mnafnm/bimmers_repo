const express = require('express');
const inventoryServicesAPI = express.Router();
const pool = require('../config/db.js');




inventoryServicesAPI.get('/inventory/:id', async (req, res) => {
    pool.getConnection((err,conn) => {
        if(conn)
        {
        // get inventory details by id from oem_parts_inventory table
        const OEM_PART_ID = req.params.id;
        var inventoryQuery = `SELECT * FROM oem_parts_inventory WHERE OEM_PART_ID = ?;`
        conn.query(inventoryQuery,[OEM_PART_ID],  (error, results)=>{
            if (error) throw error;
            // add quantity to inventory details with default value 1
           if (results.length > 0) {
            results[0].quantity = 1;
            res.json(results)
           }
        })
        

     

        }
        conn.release()
    });
});

module.exports = inventoryServicesAPI;