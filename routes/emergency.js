const fs = require('fs')

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    fs.writeFile('../log.txt', '', function(){console.log('done')})
});

module.exports = router;


