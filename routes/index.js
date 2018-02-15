/* Retrieve Router Handler */
var express = require('express');
var router = express.Router();

/* Views */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'APP TITLE',
        navbar: {title: 'APP TITLE NAV'}
    });
});


/* API Endpoints */


module.exports = router;
