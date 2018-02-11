var express = require('express');
var passport = require('passport');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('register', { title: 'Express' });
});

router.post('/', passport.authenticate('register', {
    successRedirect: '/chat',failureRedirect: '/register',
    failureFlash: true
}));

module.exports = router;
