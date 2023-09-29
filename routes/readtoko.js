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


router.get("/:id" , (req,res) => {
    const shopID = req.params.id;
    db.query("SELECT * FROM tbshop WHERE id=" + shopID, 
    (err, result) => {
        if(err){
            console.log(err);
            res.status(500).json({ error: 'Internal server error' });
        } else{
            res.json({ result });
        }
    });
});

module.exports = router;