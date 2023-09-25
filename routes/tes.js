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
        cb(null, "./public/uploads");
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
     let finalImageURL = req.protocol + '://' + req.get('host')+ '/uploads/' + req.file.filename;
     const nama = req.body.nama;
     const shopID = 2;
     const harga = req.body.harga;
     const harga2 = req.body.harga2;
     const tipe = "123123";
     const deskripsi = req.body.deskripsi

        // const query = "INSERT INTO `tbproduk`(`shopid`, `nama`, `harga`, `tipe`, `deskripsi`, `harga2`,`img`) VALUES ("+shopID+","+nama+",?,?,?,?,?)";
        // db.query(sql , (err, data)=>{
        //     res.json({status: "sukses",image: finalImageURL})
        // })
        db.query(
            "INSERT INTO `tbproduk`( `shopid`, `nama`, `harga`, `tipe`, `deskripsi`, `harga2`, `img`) VALUES ('"+shopID+"','"+nama+"','"+harga+"','"+tipe+"','"+deskripsi+"','"+harga2+"','"+finalImageURL+"')",
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                res.send("Data berhasil ditambah");
              }
            }
          );

    })


module.exports = router;