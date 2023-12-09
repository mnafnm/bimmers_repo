const express = require('express');
const orderServicesAPI = express.Router();
const pool = require('../config/db.js');




// update Repair order data in orders table
orderServicesAPI.patch('/repair-order/:id', async (req, res) => {
    pool.getConnection((err,conn) => {
        if(conn)
        {
            const order_ID = req.params.id;
            const { agree, mechanicNotes, recommendedServices } = req.body;
            const orderQuery = `UPDATE orders SET agree = ?, mechanicNotes = ?, recommendedServices = ? WHERE order_ID = ?;`
            conn.query(orderQuery,[agree, mechanicNotes, recommendedServices, order_ID],  (error, results)=>{
                if (error) throw error;
                res.json(results)
            }
            )
        }
        conn.release()
    });
});
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

                // make the repair_items and required_services as JSON object
                results[0].repair_items = JSON.parse(results[0].repair_items)
                results[0].required_services = JSON.parse(results[0].required_services)

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
            const { hour, rate, subtotal, discount, total, required_services, repair_items, towing_charge} = req.body;
            const orderQuery = `UPDATE orders SET hour = ?, rate = ?, subtotal = ?, discount = ?, total = ?, repair_items = ?, required_services = ?, towing_charge = ? WHERE order_ID = ?;`
            conn.query(orderQuery,[hour, rate, subtotal, discount, total, JSON.stringify(repair_items), JSON.stringify(required_services), towing_charge, order_ID],  (error, results)=>{
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
                towing_charge: r.towing_charge,
                mechanicNotes: r.mechanicNotes,
                recommendedServices: r.recommendedServices,
                invoice_number: r.invoice_number,
                CUSTOMER_ID: r.CUSTOMER_ID,
                hour: r.hours,
                rate: r.rate,
                subtotal: r.subTotal,
                discount: r.discount,
                total: r.total,
                agree:r.agree,
                required_services: JSON.stringify(r.required_services),
                repair_items: JSON.stringify(r.repair_items),
                order_date: mysqlFormattedDate
            };
            

           
            const orderArray = Object.keys(order).map(key => order[key]);
          
            var orderQuery = `INSERT INTO orders (towing_charge,mechanicNotes,recommendedServices,invoice_number, CUSTOMER_ID, hour, rate, subtotal, discount, total, agree, required_services, repair_items, order_date) VALUES (?);`

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
            // insert data in repair_order table and also
        }
        conn.release()
    });
});

module.exports = orderServicesAPI;