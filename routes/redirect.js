const express = require('express');
const router = express.Router();
//const firebaseAdmin = require('../firebase-admin');

router.post('/',(req,res)=>{
    res.render()
    /*
    var idToken=req.body.idToken;
    firebaseAdmin
    .auth()
    .verifyIdToken(idToken)
    .then(decodedToken=>{
        const uid = decodedToken.uid
        console.log('redirecting...')
        res.redirect('/testAPI')
    })
    .catch(error=>{
        console.log(error);
    })*/
})

module.exports = router;