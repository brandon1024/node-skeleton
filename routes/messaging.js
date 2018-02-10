var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/me', function(req, res, next) {
    res.render('messaging', { title: 'Express' });
});

module.exports = router;
