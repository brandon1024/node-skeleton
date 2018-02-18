/* Retrieve Router Handler */
const express = require('express');
const config = require("../config");
const router = express.Router();
const debug = require('debug')('route-home');

/* Views */
router.get('/', function(req, res, next) {
    res.render('dashboard', {
        title: config.title,
        navbar: config.navbar
    });
});


/* API Endpoints */


module.exports = router;
