/* Retrieve Router Handler */
const express = require('express');
const router = express.Router();

/* Debugger */
const debug = require('debug')('route-index');

module.exports = (app, passport) => {
    /* Views */
    router.get('/', function(req, res, next) {
        res.render('index', {
            authenticated: req.isAuthenticated()
        });
    });


    /* API Endpoints */

    /* Register Router */
    app.use('/', router);
};

