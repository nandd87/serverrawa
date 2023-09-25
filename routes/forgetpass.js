const express = require('express');
const router = require('express').Router();
const mysql = require('mysql');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require("cookie-parser");
const mailer = require("nodemailer");

const db= mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "testserver",
})


const transporter = nodemailer.createTransport({
    host: "smtp.forwardemail.net",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "REPLACE-WITH-YOUR-ALIAS@YOURDOMAIN.COM",
      pass: "REPLACE-WITH-YOUR-GENERATED-PASSWORD",
    },
  });
  

  
  main().catch(console.error);

 module.exports = router;