const express = require("express");
const router = require('express').Router();
const mysql = require('mysql');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const multer = require('multer');
const path = require("path");

const db= mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "dbrawabelong",
})

const storage = multer.diskStorage({
    destination:function (req,file,cb){
        cb(null, "./public/upload");
       },
       filename: function(req,file,cb){
        cb(
            null,
            path.parse(file.originalname).name + 
            "-"+
            Date.now() + 
            path.extname(file.originalname)
        );
       }
  })

  const upload = multer({ storage: storage })

// router.post('/' , upload.single('photo'), (req , res) =>{
//         let finalImageURL = req.protocol + '://' + req.get('host')+ '/uploads/' + req.file.filename;
//         res.json({status: "sukses",image: finalImageURL})
//     })


    router.post('/' , upload.single('gambar'), (req, res) =>{
        const shopID = 2;
        const nama = req.body.nama;
        const harga = req.body.harga;
        const deskripsi = req.body.deskripsi;
        const tipe = req.body.tipe;
        const namatoko = req.body.namatoko;
        const harga2 = req.body.harga2;
        let finalImageURL = req.protocol + '://' + req.get('host')+ '/uploads/' + req.file.filename;
        const img = "tes";
        // const query = "INSERT INTO `tbproduk`(`shopid`, `nama`, `harga`, `tipe`, `deskripsi`, `harga2`,`img`) VALUES ("+shopID+","+nama+",?,?,?,?,?)";
        // db.query(sql , (err, data)=>{
        //     res.json({status: "sukses",image: finalImageURL})
        // })
        const sql = "INSERT INTO tbproduk (shopid, namatoko, nama, harga, tipe, deskripsi, harga2, img) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        const values = [shopID, namatoko, nama, harga, tipe, deskripsi, harga2, img];
      
        db.query(sql, values, (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
          } else {
            res.send("Data berhasil ditambah");
          }
        });
    })


module.exports = router;