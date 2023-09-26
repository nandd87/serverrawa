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




    router.post('/' , upload.single('gambar'), (req, res) =>{
      const id = req.body.id;
      const nama = req.body.nama;
      let finalImageURL = req.protocol + '://' + req.get('host')+ '/upload/' + req.file.filename;
      const harga = req.body.harga;
      const harga2 = req.body.harga2;
      const tipe = req.body.tipe;
      const img = req.body.img;
      const deskripsi = req.body.deskripsi;
    
      const query = "SELECT `name` FROM `tbshop` WHERE id = "+id+"";
    
      db.query(query, [id], (err, results) => {
        if (err) {
          console.error('Error executing first query:', err);
          res.status(500).json({ error: 'Database error' });
        } else {
          if (results.length === 0) {
            res.status(404).json({ message: 'Shop not found' });
          } else {
            const value = results[0].name;
    
            // Now 'value' contains the data from the database, and you can use it in the second query
    
            const query2 = "INSERT INTO `tbproduk`(`shopid`, `namatoko`, `nama`, `harga`, `tipe`, `deskripsi`, `harga2`, `img`) VALUES ('"+id+"','"+value+"','"+nama+"','"+harga+"','"+tipe+"','"+deskripsi+"','"+harga2+"','"+finalImageURL+"')";
    
            db.query(query2, [id,value, nama, harga, tipe, deskripsi, harga2, img], (err, results) => {
              if (err) {
                console.error('Error executing second query:', err);
                res.status(500).json({ error: 'Database error' });
              } else {
                console.log('Data berhasil ditambah');
                res.json({ message: 'Data berhasil ditambah' });
              }
            });
          }
        }
      });
    })


module.exports = router;