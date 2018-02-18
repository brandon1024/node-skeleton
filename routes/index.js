/* Retrieve Router Handler */
const express = require('express');
const config = require("../config");
const router = express.Router();
const debug = require('debug')('route-index');

/* Views */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: config.title,
        navbar: config.navbar
    });
});


/* API Endpoints */


module.exports = router;
