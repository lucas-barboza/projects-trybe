require('dotenv').config();

const mysql = require('mysql2/promise');

const conexaoMysql = mysql.createPool({
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.MYSQL_HOST,
  database: process.env.MYSQL_DATABASE,
});

module.exports = conexaoMysql; 