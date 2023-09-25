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


router.post("/", (req, res) => {
    const shopID = req.body.shopID;
    const nama = req.body.nama;
    const harga = req.body.harga;
    const tipe = req.body.tipe;
    const img = req.body.img;
    const deskripsi = req.body.deskripsi;
    
   db.query(
      "INSERT INTO `tbproduk`(`shopID`, `nama`, `harga`, `tipe`, `img`, `deskripsi`) VALUES ('"+ shopID + "','"+ nama +"','"+harga+"','"+tipe+"','"+img+"','"+deskripsi+"')",
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Data berhasil ditambah");
        }
      }
    );
 });  

 module.exports = router;