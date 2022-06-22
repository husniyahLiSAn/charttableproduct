require('dotenv').config();
const mysql = require('mysql');
const express = require('express');

const app = express();

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

connection.connect((err) => {
  if (err) throw err;
  console.log(`Success connected to MYSQL Server! Connected to DB ${process.env.MYSQL_DATABASE}`);
});

app.get('/products/chart', (req, res) => {
  connection.query('SELECT store_id, SUM(compliance)/COUNT(report_id)*100 AS nilai FROM `report_product` GROUP BY store_id', (err, rows) => {
    if (err) throw err;
    console.log('Products: \n', rows);
    connection.end();
  });
});

app.get('/products/table', (req, res) => {
  connection.query(`SELECT rp.store_id, b.brand_id, 
      SUM(compliance)/COUNT(b.brand_id)*100 AS nilai 
      FROM report_product rp 
      LEFT JOIN product p ON rp.product_id = p.product_id 
      LEFT JOIN product_brand b ON p.brand_id = b.brand_id 
      GROUP BY store_id, brand_id`, (err, rows) => {
    if (err) throw err;
    console.log('Products: \n', rows);
    connection.end();
  });
});

app.get('/products/filter', (req, res) => {
  connection.query(`SELECT store_id, SUM(compliance)/COUNT(report_id)*100 AS nilai 
      FROM report_product WHERE
        store_id IN $1 AND 
        tanggal BETWEEN $2 AND $3
      GROUP BY store_id`, (err, rows) => {
    if (err) throw err;
    console.log('Products: \n', rows);
    connection.end();
  });
});

app.listen(3000, () => {
  console.log(`Server is running at port ${process.env.PORT}`);
});
