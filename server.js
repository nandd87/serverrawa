const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require("cookie-parser");
const app = express();
const multer = require('multer');
const path = require("path");
const store = new session.MemoryStore();

const bodyParser = require('body-parser');
app.use(cors({ credentials: true, origin: 'http://localhost:3000'}));
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
const oneDay = 1000 * 60 * 60 * 24;

const loginRoute = require('./routes/login');
const grabprodRoute = require('./routes/grabproduct');
const createprodRoute = require('./routes/createproduct');
const uploadfileTest = require('./routes/grabfiletest');
const updateacc = require('./routes/updateacc');
const tes = require('./routes/tes');
const buattoko = require('./routes/addtoko');
const logincheck = require('./routes/logincheck')
const search = require('./routes/search')
const readtokobyid = require('./routes/readtoko');
const readproductbyid = require('./routes/readproduct'); 
const transaksi = require('./routes/transaksi');
const readtransaksibyid = require('./routes/readtransaksi')

app.use('/login',loginRoute)
app.use('/grab',grabprodRoute)
app.use('/create',createprodRoute)
app.use('/uploads',uploadfileTest)
app.use('/update',updateacc)
app.use('/addproduct', tes)
app.use("/newshop" ,buattoko)
app.use("/logincheck", logincheck)
app.use("/transaksi",transaksi)

app.use("/search", search)
app.use("/readtokobyid", readtokobyid)
app.use("/readprodukbyid", readproductbyid)
app.use("/readtransaksibyid" , readtransaksibyid)

app.listen(8081, ()=>{
    console.log("listnening in port 8081")
})