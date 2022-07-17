const mysql = require('mysql2');
const fs = require('fs');
const serverCa = [fs.readFileSync("process.env.SSL", "utf8")];

const pool = mysql.createPool({
    host: process.env.HOSTNAME,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    port: process.env.PORT,
    database: process.env.DATABASE,
    ssl: {
        rejectUnauthorized: true,
        ca: serverCa
    }
});

global.db = pool;