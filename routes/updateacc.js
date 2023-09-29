const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const multer = require('multer');
const path = require('path');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "dbrawabelong",
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/upload");
    },
    filename: function (req, file, cb) {
        cb(
            null,
            path.parse(file.originalname).name +
            "-" +
            Date.now() +
            path.extname(file.originalname)
        );
    },
});

const upload = multer({ storage: storage });

router.post("/", upload.single('gambar'), (req, res) => {
    try {
        const id = req.body.id;
        const email = req.body.email;
        const name = req.body.name;
        const username = req.body.username;
        const password = req.body.password;
        const rekening = req.body.rekening;
        const deskripsi = req.body.deskripsi;
        const shopadd = req.body.shopadd;
        const shopphone = req.body.shopphone;
        const bankname = req.body.bankname;
        const banknum = req.body.banknum;
        
        let img = '';

        if (req.file) {
            img = req.protocol + '://' + req.get('host')+ '/upload/' + req.file.filename;
        }

        const sql = "UPDATE `tbshop` SET `email`=?, `name`=?, `username`=?, `password`=?, `rekening`=?, `shopimg`=?, `description`=?, `shopAddress`=?, `shopPhone`=?, `bankName`=?, `bankNum`=? WHERE `id` = ?";
        const values = [email, name, username, password, rekening, img, deskripsi, shopadd, shopphone, bankname, banknum, id];
        
        db.query(sql, values, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal server error' });
            } else {
                console.log("berhasil");
                return res.json({ result });
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;
