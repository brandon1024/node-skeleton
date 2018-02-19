/* Retrieve Router Handler */
const express = require('express');
const router = express.Router();

/* Debugger */
const debug = require('debug')('route-home');

module.exports = (app, passport) => {
    function authenticate(req, res, next) {
        if (req.isAuthenticated())
            return next();

        res.redirect('/login')
    }

    /* Views */
    router.get('/', authenticate, function(req, res, next) {
        res.render('dashboard', {
            title: 'APP TITLE - Dashboard',
            navbar: {
                title: 'APP TITLE NAV',
                links: [
                    {title: 'Home', url: '/'},
                    {title: 'About', url: '/'},
                    {title: 'Help', url: '/'}]
            }
        });
    });


    /* API Endpoints */

    /* Register Router */
    app.use('/dashboard', router);
};
