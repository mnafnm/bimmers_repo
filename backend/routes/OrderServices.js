const express = require('express');
const orderServicesAPI = express.Router();
const pool = require('../config/db.js');



// get order details by id from orders table
orderServicesAPI.get('/orders/:id', async (req, res) => {

    pool.getConnection((err,conn) => {
        if(conn)
        {
            const order_ID = req.params.id;
            // get order details by id from orders table also customer details from customers table and vehicle details from vehicle_info table
            const orderQuery = `SELECT *,v.MODEL, v.COLOR, v.MAKE, v.PRODUCTION_DATE, v.LICENSE_PLATE, v.VIN FROM orders INNER JOIN customers ON orders.CUSTOMER_ID = customers.CUSTOMER_ID, vehicle_info v WHERE orders.CUSTOMER_ID = v.CUSTOMER_ID AND orders.order_ID = ?;`
            conn.query(orderQuery,[order_ID],  (error, results)=>{
                if (error) throw error;
                res.json(results)
            }
            )
        }
        conn.release()
    });
});


// update order details by id from orders table
orderServicesAPI.patch('/orders/:id', async (req, res) => {
    pool.getConnection((err,conn) => {
        if(conn)
        {
            // update only some fields of order details by id from orders table
            const order_ID = req.params.id;
            const { hour, rate, subtotal, discount, total, required_services, repair_items} = req.body;
            const orderQuery = `UPDATE orders SET hour = ?, rate = ?, subtotal = ?, discount = ?, total = ?, repair_items = ? WHERE order_ID = ?;`
            conn.query(orderQuery,[hour, rate, subtotal, discount, total, JSON.stringify(repair_items), order_ID],  (error, results)=>{
                if (error) throw error;
                res.json(results)
            }
            )
        }
        conn.release()
    });
});

// get all orders
orderServicesAPI.get('/orders', async (req, res) => {
    pool.getConnection((err,conn) => {
        if(conn)
        {
            // get all orders from orders table also customer details from customers table
            const orderQuery = `SELECT *,v.MODEL, v.COLOR, v.MAKE, v.PRODUCTION_DATE, v.LICENSE_PLATE, v.VIN FROM orders INNER JOIN customers ON orders.CUSTOMER_ID = customers.CUSTOMER_ID, vehicle_info v
            Where orders.CUSTOMER_ID = v.CUSTOMER_ID;`

            conn.query(orderQuery, (error, results)=>{
                if (error) throw error;
                res.json(results)
            }
            )
        }
        conn.release()
    });
});

orderServicesAPI.post('/createOrder', async (req, res) => {
    pool.getConnection((err,conn) => {
        if(conn)
        {
            var r = req.body
            const orderDate = new Date(req.body.order_date);

            // Convert to a MySQL-compatible string format
            const mysqlFormattedDate = orderDate.toISOString().slice(0, 19).replace('T', ' ');
            var order = {
                mechanicNotes: r.mechanicNotes,
                recommendedServices: r.recommendedServices,
                invoice_number: r.invoice_number,
                CUSTOMER_ID: r.CUSTOMER_ID,
                hour: r.hours,
                rate: r.rate,
                subtotal: r.subTotal,
                discount: r.discount,
                total: r.total,
                required_services: JSON.stringify(r.required_services),
                repair_items: JSON.stringify(r.repair_items),
                order_date: mysqlFormattedDate
            };
            

           
            const orderArray = Object.keys(order).map(key => order[key]);
          
            var orderQuery = `INSERT INTO orders (mechanicNotes,recommendedServices,invoice_number, CUSTOMER_ID, hour, rate, subtotal, discount, total, required_services, repair_items, order_date) VALUES (?);`

            conn.query(orderQuery,[orderArray], (error, results)=>{
                if (error) throw error ;
                res.json(results)
            })
        }
        conn.release()
    });
})

orderServicesAPI.post('/saveRepairOrder', async (req, res) => {
    pool.getConnection((err,conn) => {
        if (err) throw err;
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