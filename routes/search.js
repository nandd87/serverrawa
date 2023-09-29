const router = require('express').Router();
const mysql = require('mysql');

const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "dbrawabelong",
})

router.get('/:search', (req, res) => {
  const search = req.params.search;
  db.query(
    "SELECT * FROM `tbproduk` WHERE nama LIKE '%" + search + "%' OR namatoko LIKE '%" + search + "%'",
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.json({ result });
      }      
    }
  );
});

module.exports = router;