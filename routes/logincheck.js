const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'testserver',
});

router.get('/', (req, res) => {
    if (req.session.idses) {
      try {
        return res.json("true");
      } catch (error) {
        return res.status(500).json({ error: 'Failed to parse JSON data' });
      }
    } else {
        return res.json("false")
    }
  });

module.exports = router;