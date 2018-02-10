var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/register', function(req, res, next) {
    res.render('registration', { title: 'Express' });
});

module.exports = router;
