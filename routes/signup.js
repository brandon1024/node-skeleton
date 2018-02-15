var express = require('express');
var passport = require('passport');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('signup', { title: 'Express' });
});

router.post('/', passport.authenticate('register', {
    successRedirect: '/chat',failureRedirect: '/signup',
    failureFlash: true
}));

module.exports = router;
