var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Express' });
});

module.exports = router;
