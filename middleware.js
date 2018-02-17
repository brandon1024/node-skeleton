/* Application */
const path     = require('path');
const express  = require('express');

/* Middleware Definitions */
const httplogger = require('morgan');
const session = require('express-session');
const bodyParser = require('body-parser');
const sassMiddleware = require('node-sass-middleware');
const flash = require("connect-flash");
const passport = require('passport');
const debug = require('debug')('middleware-config');

/* Model Definition */
const models   = require('./models');

module.exports = function (app) {
    /* Configure Middleware */
    app.use(httplogger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.use(session({
        secret: 'hackthehack',
        resave: true,
        saveUninitialized: true
    }));

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());
    app.use(sassMiddleware({
        src: path.join(__dirname, 'public'),
        dest: path.join(__dirname, 'public'),
        indentedSyntax: true, // true = .sass and false = .scss
        sourceMap: true
    }));

    /* Configure Database */
    app.use(function (req, res, next) {
        models(function (err, db) {
            if (err) return next(err);

            req.models = db.models;
            req.db     = db;

            return next();
        });
    })
};