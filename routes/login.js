const express = require('express');
const router = require('express').Router();
const mysql = require('mysql');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require("cookie-parser");

const db= mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "dbrawabelong",
})

router.post('/', (req, res) => {
    const sql = "SELECT * FROM tbshop WHERE email = ? AND password = ?";
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
      if (err) return res.json(err);
      if (data.length > 0) {
        const id = data[0].id; // Retrieve the id from the data object
        res.cookie('session_id', id); // Set the 'session_id' cookie with the user's id
        
        return res.json({ success: true });
      } else {
        return res.json("gagal");
      }
    });
  });

module.exports = router;