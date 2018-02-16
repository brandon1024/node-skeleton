/* Retrieve Router Handler */
const express = require('express');
const router = express.Router();
const debug = require('debug')('route-index');

/* Views */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'APP TITLE',
        navbar: {title: 'APP TITLE NAV'}
    });
});


/* API Endpoints */


module.exports = router;
