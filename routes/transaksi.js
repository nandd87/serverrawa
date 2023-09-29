const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "dbrawabelong",
});


router.post("/", (req, res) => {
    const now = new Date(); // Current date and time

    const year = now.getFullYear();   // Get the year (e.g., 2023)
    const month = now.getMonth() + 1; // Get the month (0-11, add 1 for 1-12)
    const day = now.getDate();        // Get the day of the month (1-31)
    const hours = now.getHours();     // Get the hour (0-23)
    const minutes = now.getMinutes(); // Get the minutes (0-59)
    const seconds = now.getSeconds(); // Get the seconds (0-59)


    const notelp = req.body.no; // Ganti menjadi 'notelp'
    const desc = req.body.desc; // Ganti menjadi 'desc'
    const namaproduk = req.body.namap; // Ganti menjadi 'namaproduk'
    const nama = req.body.nama;
    const shopID = req.body.id;
    const waktu = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`; 
    const status = "Pending";

    const query2 = "INSERT INTO `tbtransaksi`(`shopid`, `noTelp`, `deskripsi`, `namaProduk`, `waktu`, `status`,`nama`) VALUES (?,?,?,?,?,?,?)";

    db.query(query2, [shopID, notelp, desc, namaproduk, waktu, status, nama], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            // Handle the error and send a response indicating the error
            res.status(500).json({ error: 'Terjadi kesalahan dalam server' });
        } else {
            console.log('berhasil');
            // Send a success response if the query is executed successfully
            res.json({ success: true });
        }
    });
});

module.exports = router;
