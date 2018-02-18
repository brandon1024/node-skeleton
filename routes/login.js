/* Retrieve Router Handler */
const express = require('express');
const router = express.Router();

/* Debugger */
const debug = require('debug')('route-login');

/* Retrieve Passport Authentication Service */
const passport = require('passport');

/* Models */


/* Views */
router.get('/', function(req, res, next) {
    res.render('login', {
        title: 'APP TITLE',
        navbar: {
            title: 'APP TITLE NAV',
            links: [
                {title: 'Home', url: '/'},
                {title: 'Login', url: '/login'},
                {title: 'Sign Up', url: '/signup'},
                {title: 'About', url: '/'},
                {title: 'Help', url: '/'}]
        }
    });
});


/* API Endpoints */
router.post('/', passport.authenticate('login', {
    successRedirect: '/chat', failureRedirect: '/login',
    failureFlash: true
}));


module.exports = router;
