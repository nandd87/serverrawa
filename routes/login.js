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

    router.post('/' , (req , res) =>{
    const sql = "SELECT * FROM tbshop WHERE email = ? AND password = ?";
    db.query(sql,[req.body.email,req.body.password] , (err, data) =>{
        if(err) return res.json("error");
        if(data.length > 0){
            req.session.email = req.body.email;
            req.session.idses = data[0].id;
            req.session.save();
            return res.json({ success: true, idses: req.session.idses });
        }else{
            return res.json("gagal");
        }
    })
    })

module.exports = router;