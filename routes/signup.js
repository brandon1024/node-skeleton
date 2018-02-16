/* Retrieve Router Handler */
const express = require('express');
const router = express.Router();
const debug = require('debug')('route-signup');

/* Passport Authentication Service */
const passport = require('passport');

/* Views */
router.get('/', function(req, res, next) {
    res.render('signup', {
        title: 'APP TITLE',
        navbar: {title: 'APP TITLE NAV'}
    });
});


/* API Endpoints */
router.post('/', passport.authenticate('signup', {
    successRedirect: '/chat',failureRedirect: '/signup',
    failureFlash: true
}));


module.exports = router;
