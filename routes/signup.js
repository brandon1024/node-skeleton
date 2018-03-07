/* Retrieve Router Handler */
const express = require('express');
const router = express.Router();

/* Debugger */
const debug = require('debug')('route-signup');

module.exports = (app, passport) => {
    /* Views */
    router.get('/', function(req, res, next) {
        if (req.isAuthenticated())
            return res.redirect('/dashboard');

        res.render('signup', {
            error: req.flash('error'),
            authenticated: req.isAuthenticated()
        });
    });


    /* API Endpoints */
    router.post('/', passport.authenticate('signup', {
        successRedirect: '/dashboard',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    /* Register Router */
    app.use('/signup', router);
};