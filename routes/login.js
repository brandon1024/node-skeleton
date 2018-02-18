/* Retrieve Router Handler */
const express = require('express');
const router = express.Router();
const debug = require('debug')('route-login');

/* Retrieve Passport Authentication Service */
const passport = require('passport');
const config = require("../config");

/* Views */
router.get('/', function(req, res, next) {
    res.render('login', {
        title: config.title,
        navbar: config.navbar
    });
});


/* API Endpoints */
router.post('/', passport.authenticate('login', {
    successRedirect: '/chat', failureRedirect: '/login',
    failureFlash: true
}));


module.exports = router;
