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


router.post("/", upload.single('gambar'),(req, res) => {
    try {
        const id = req.session.id;
        const email = req.body.email;
        const name = req.body.name;
        const username = req.body.username;
        const password = req.body.password;
        const rekening = req.body.rekening;
        let finalImageURL = req.protocol + '://' + req.get('host')+ '/uploads/' + req.file.filename;
        
        const sql = "UPDATE `tbshop` SET `email`='"+email+"',`name`='"+name+"',`username`='"+username+"',`password`='"+password+"',`rekening`='"+rekening+"',`shopimg`='"+finalImageURL+"' WHERE `id` = '"+id+"' ";
        return res.json({ sql });
    } catch (error) {
        console.log(error)
    }
});  

 module.exports = router;