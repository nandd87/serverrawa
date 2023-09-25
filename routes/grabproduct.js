const express = require("express");
const router = require('express').Router();
const mysql = require('mysql');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require("cookie-parser");

const db= mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "rawabelongapp",
})


router.get("/" , (req,res) => {
    db.query("SELECT * FROM tbproduk" , (err,result) => {
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    });
});

module.exports = router;