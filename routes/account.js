/* Retrieve Router Handler */
const express = require('express');
const router = express.Router();

/* Debugger */
const debug = require('debug')('route-home');

module.exports = (app, passport) => {
    function authenticate(req, res, next) {
        if (req.isAuthenticated())
            return next();

        req.session.redirectTo = req.originalUrl;
        res.redirect('/login');
    }

    /* Views */
    router.get('/', authenticate, (req, res, next) => {
        res.render('account', {
            authenticated: req.isAuthenticated()
        });
    });

    /* API Endpoints */

    app.use('/account', router);
};