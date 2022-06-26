const fs = require('fs')

var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
        fs.writeFile('../log.txt', '', function(){console.log('done')})
        .then(result=>{
            res.send(`log file cleared.  ${result}`);
        })
        .catch(err=>{
            res.send(`failed to clear log; ${err}`);
        });
});

module.exports = router;


