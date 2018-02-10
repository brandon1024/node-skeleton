var express = require('express');
var passport = require('passport');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('login', { title: 'Express' });
});

router.post('/', passport.authenticate('local', {
    successRedirect: '/',failureRedirect: '/login',
    failureFlash: true
}));

module.exports = router;
