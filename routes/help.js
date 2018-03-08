/* Retrieve Router Handler */
const express = require('express');
const router = express.Router();
const showdown  = require('showdown');
const fs = require('fs');

/* Debugger */
const debug = require('debug')('route-help');

const converter = new showdown.Converter();

module.exports = (app, passport) => {
    /* Views */
    router.get('/', function(req, res, next) {
        fs.readFile('documents/help.md','utf-8', (err, data) => {
            if(err) throw err;
            let html = converter.makeHtml(data);

            res.render('help', {
                authenticated: req.isAuthenticated(),
                html: html
            });
        })
    });



    /* API Endpoints */

    /* Register Router */
    app.use('/help', router);
};
