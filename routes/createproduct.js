const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const multer = require('multer')

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dbrawabelong',
});
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

router.post('/', upload.single('gambar'), (req, res) => {
  const id = req.body.id;
  const nama = req.body.nama;
  let finalImageURL = req.protocol + '://' + req.get('host')+ '/upload/' + req.file.filename;
  const harga = req.body.harga;
  const harga2 = req.body.harga2;
  const tipe = req.body.tipe;
  const img = req.body.img;
  const deskripsi = req.body.deskripsi;

  const query = "SELECT `name` FROM `tbshop` WHERE id = "+id+"";

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      // Handle the error
    } else {
      // Assuming you expect a single result, you can access it like this
      const value = results[0].name;
      
      // Now 'value' contains the data from the database, and you can use it as needed
      console.log('Retrieved value from the database:', value);

      const query2 = "INSERT INTO `tbproduk`( `shopid`, `nama`, `harga`, `tipe`, `deskripsi`, `harga2`, `img`) VALUES ('"+id+"','"+value+"','"+harga+"','"+tipe+"','"+deskripsi+"','"+harga2+"','"+finalImageURL+"')"
    db.query(query2) , (err,results) => {
    if (err) {
      console.error('Error executing query:', err);
      // Handle the error
    } else {

      console.log('berhasil');
    }
  }
    }

    
  });

  
})

module.exports = router;
