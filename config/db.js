const mysql = require('mysql2');
const fs = require('fs');

const pool = mysql.createPool({
    host: process.env.HOSTNAME,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    port: process.env.PORT,
    database: process.env.DATABASE,
    ssl: {
        ca: fs.readFileSync(path.join(__dirname, process.env.SSL)),
        rejectUnauthorized: true,
        require: true,
    }
});

global.db = pool;