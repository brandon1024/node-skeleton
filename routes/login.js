/* Retrieve Router Handler */
var express = require('express');
var router = express.Router();

/* Retrieve Passport Authentication Service */
var passport = require('passport');

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
