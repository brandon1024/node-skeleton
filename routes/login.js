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
            title: 'APP TITLE',
            navbar: {
                title: 'APP TITLE NAV',
                links: [
                    {title: 'Home', url: '/'},
                    {title: 'Login', url: '/login'},
                    {title: 'Sign Up', url: '/signup'},
                    {title: 'About', url: '/'},
                    {title: 'Help', url: '/'}]
            },
            authenticated: req.isAuthenticated()
        });
    });


    /* API Endpoints */
    router.post('/', passport.authenticate('login', {
        successRedirect: '/dashboard',
        failureRedirect: '/login',
        failureFlash: true
    }));

    /* Register Router */
    app.use('/login', router);
};