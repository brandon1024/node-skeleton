/* Retrieve Router Handler */
const express = require('express');
const router = express.Router();
const debug = require('debug')('route-login');

/* Retrieve Passport Authentication Service */
const passport = require('passport');

/* Views */
router.get('/', function(req, res, next) {
    res.render('login', {
        title: 'APP TITLE',
        navbar: {title: 'APP TITLE NAV'}
    });
});


/* API Endpoints */
router.post('/', passport.authenticate('login', {
    successRedirect: '/chat', failureRedirect: '/login',
    failureFlash: true
}));


module.exports = router;
