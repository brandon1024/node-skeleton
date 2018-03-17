/* Retrieve Router Handler */
const express = require('express');
const router = express.Router();

/* Debugger */
const debug = require('debug')('route-help');

module.exports = (app, passport) => {
    /* Views */
    router.get('/', (req, res, next) => {
        return res.render('help');
    });

    /* API Endpoints */

    /* Register Router */
    app.use('/help', router);
};
