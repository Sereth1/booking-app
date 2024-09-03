import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'T3r4st10s',
    database: 'airbnb_booking',
});

export default pool;
