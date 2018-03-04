/* Retrieve Router Handler */
const express = require('express');
const router = express.Router();
var showdown  = require('showdown');
var fs = require('fs');

/* Debugger */
const debug = require('debug')('route-help');

var converter = new showdown.Converter();

module.exports = (app, passport) => {
    /* Views */
    router.get('/', function(req, res, next) {
        fs.readFile('documents/help.md','utf-8', (err, data) => {
            if(err) throw err;
            var html = converter.makeHtml(data);

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
