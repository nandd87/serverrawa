const express = require('express');
const router = express.Router();
const session = require('express-session');

router.get('/', (req, res) => {
  if (req.session.idses) {
    return res.json(req.session.idses)
  } else {
    return res.json(req.session.idses)
  
  }
});

module.exports = router;