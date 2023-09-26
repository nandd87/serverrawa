const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require("cookie-parser");
const app = express();
const multer = require('multer');
const path = require("path");

const bodyParser = require('body-parser');
app.use(cors({ credentials: true, origin: 'http://localhost:3000'}));
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: "thisismysecrctekey",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
    }));

const loginRoute = require('./routes/login');
const grabprodRoute = require('./routes/grabproduct');
const createprodRoute = require('./routes/createproduct');
const uploadfileTest = require('./routes/grabfiletest');
const updateacc = require('./routes/updateacc');
const tes = require('./routes/tes');
const buattoko = require('./routes/addtoko');
const logincheck = require('./routes/logincheck')

app.use('/login',loginRoute)
app.use('/grab',grabprodRoute)
app.use('/create',createprodRoute)
app.use('/uploads',uploadfileTest)
app.use('/update',updateacc)
app.use('/tes' , tes)
app.use("/newshop" ,buattoko)
app.use("/logincheck",logincheck )

app.listen(8081, ()=>{

    console.log("listnening in port 8081")
})