var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'APP TITLE',
        navbar: {title: 'APP TITLE NAV'}
    });
});

module.exports = router;
