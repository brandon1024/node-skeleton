/* Retrieve Router Handler */
const express = require('express');
const router = express.Router();

/* Debugger */
const debug = require('debug')('route-signup');

module.exports = (app, passport) => {
    /* Views */
    router.get('/', function(req, res, next) {
        if (req.isAuthenticated()) {
            res.redirect('/dashboard');
            return next();
        }

        res.render('signup', {
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
            }
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