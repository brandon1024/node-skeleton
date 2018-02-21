/* Retrieve Router Handler */
const express = require('express');
const router = express.Router();

/* Debugger */
const debug = require('debug')('route-logout');

module.exports = (app, passport) => {
    /* Views */

    /* API Endpoints */
    router.get('/', function(req, res){
        req.logout();
        res.redirect('/login');
    });

    /* Register Router */
    app.use('/logout', router);
};
