import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const host = process.env.SQL_HOST
const user = process.env.SQL_USER
const pass = process.env.SQL_PASS
const database = process.env.SQL_DB


const pool = mysql.createPool({

    host: host,
    user: user,
    password: pass,
    database: database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;
