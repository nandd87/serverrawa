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
    database : "dbrawabelong",
})


router.get("/" , (req,res) => {
    const shopid = req.session.id;
    db.query("SELECT * FROM tbproduk WHERE shopID = "+shopid+"" , (err,result) => {
        if(err){
            console.log(err);
        } else{
            res.send(result);
        }
    });
});

module.exports = router;