/* Retrieve Router Handler */
const express = require('express');
const router = express.Router();
const debug = require('debug')('route-signup');

/* Passport Authentication Service */
const passport = require('passport');
const config = require("../config");

/* Views */
router.get('/', function(req, res, next) {
    res.render('signup', {
        title: config.title,
        navbar: config.navbar
    });
});


/* API Endpoints */
router.post('/', passport.authenticate('signup', {
    successRedirect: '/chat', failureRedirect: '/signup',
    failureFlash: true
}));


module.exports = router;
