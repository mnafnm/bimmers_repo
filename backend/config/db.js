const mysql = require('mysql');
require('dotenv/config');

const pool = mysql.createPool({
connectionLimit: 10,
host: "localhost",
user: "root",
password:"root@123456", 
database:"bimmers_data",
});

module.exports = pool;