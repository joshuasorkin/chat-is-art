var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("testing index");
  res.render('wearer.html');
});

module.exports = router;
