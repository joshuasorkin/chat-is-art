const fs = require('fs')

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
        fs.writeFile('../log.txt', '')
        .then(result=>{
            res.send(`log file cleared.  ${result}`);
        })
        .catch(err=>{
            res.send(`failed to clear log; ${err}`);
        });
});

module.exports = router;


