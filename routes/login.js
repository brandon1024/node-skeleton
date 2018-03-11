/* Retrieve Router Handler */
const express = require('express');
const router = express.Router();

/* Debugger */
const debug = require('debug')('route-login');

module.exports = (app, passport) => {
    /* Views */
    router.get('/', function(req, res, next) {
        if (req.isAuthenticated())
            return res.redirect('/dashboard');

        res.render('login', {
            error: req.flash('error'),
            authenticated: false
        });
    });

    /* API Endpoints */
    router.post('/', passport.authenticate('login', {
        failureRedirect: '/login',
        failureFlash: 'Incorrect username or password.'
    }), (req, res, next) => {
        let redirectTo = req.session.redirectTo || '/dashboard';
        delete req.session.redirectTo;
        res.redirect(redirectTo);
    });

    /* Register Router */
    app.use('/login', router);
};