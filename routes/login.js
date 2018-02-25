/* Retrieve Router Handler */
const express = require('express');
const router = express.Router();

/* Debugger */
const debug = require('debug')('route-login');

module.exports = (app, passport) => {
    /* Views */
    router.get('/', function(req, res, next) {
        if (req.isAuthenticated()) {
            res.redirect('/dashboard');
            return next();
        }

        res.render('login', {
            error: req.flash('error'),
            authenticated: req.isAuthenticated()
        });
    });


    /* API Endpoints */
    router.post('/', passport.authenticate('login', {
        successRedirect: '/dashboard',
        failureRedirect: '/login',
        failureFlash: 'Incorrect username or password.'
    }));

    /* Register Router */
    app.use('/login', router);
};