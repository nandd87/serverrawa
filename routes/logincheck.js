const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const sessionId = req.cookies.session_id;
  if (sessionId != null) {
    return res.json({access:true, sessionId});
  } else {
    return res.json({ access: false});
  }
});

module.exports = router;