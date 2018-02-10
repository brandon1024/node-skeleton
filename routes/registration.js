var express = require('express');
var passport = require('passport');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('registration', { title: 'Express' });
});

router.post('/', passport.authenticate('registration', {
    successRedirect: '/chat',failureRedirect: '/registration',
    failureFlash: true
}));

module.exports = router;
