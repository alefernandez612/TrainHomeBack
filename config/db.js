const mysql = require('mysql2');
const fs = require('fs');
const serverCa = [fs.readFileSync(process.env.DB_SSL, "utf8")];

const pool = mysql.createPool({
    host: process.env.DB_HOSTNAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    ssl: {
        required: true,
        rejectUnauthorized: true,
        ca: serverCa
    }
});

global.db = pool;