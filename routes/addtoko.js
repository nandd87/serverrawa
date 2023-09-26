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
     let finalImageURL = req.protocol + '://' + req.get('host')+ '/upload/' + req.file.filename;
     const nama = req.body.nama;
     const email = req.session.email;
     const username = req.body.username;
     const password = req.body.password;
     const rekening = req.body.rekening;

        // const query = "INSERT INTO `tbproduk`(`shopid`, `nama`, `harga`, `tipe`, `deskripsi`, `harga2`,`img`) VALUES ("+shopID+","+nama+",?,?,?,?,?)";
        // db.query(sql , (err, data)=>{
        //     res.json({status: "sukses",image: finalImageURL})
        // })
        db.query(
            "INSERT INTO `tbshop`(`email`, `name`, `username`, `password`, `rekening`, `shopimg`) VALUES ('"+email+"','"+nama+"','"+username+"','"+password+"','"+rekening+"','"+finalImageURL+"')",
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