var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:birthday', function (req, res, next) {
  res.sendFile('index.html', { root: "public" });
});


module.exports = router;
