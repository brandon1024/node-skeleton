

/* Retrieve Router Handler */
var express = require('express');
var router = express.Router();

/* API Endpoints */
router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

module.exports = router;
