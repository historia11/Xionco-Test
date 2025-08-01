const mysql = require('mysql2/promise'); // atau pg

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'admintoko',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;