var express = require('express');
var passport = require('passport');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('signup', {
        title: 'APP TITLE',
        navbar: {title: 'APP TITLE NAV'}
    });
});

router.post('/', passport.authenticate('signup', {
    successRedirect: '/chat',failureRedirect: '/signup',
    failureFlash: true
}));

module.exports = router;
