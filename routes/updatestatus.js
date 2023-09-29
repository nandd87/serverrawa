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
    database : "testserver",
})


router.post("/",(req, res) => {
    try {
        const id = req.session.id;

        const sql = "UPDATE `tbtransaksi` SET `status`='Diterima' WHERE id = " + id;
        return res.json({ sql });
    } catch (error) {
        console.log(error)
    }
});  

 module.exports = router;