var path     = require('path');
var express  = require('express');
var models   = require('./models');
var logger = require('morgan');
var cookies = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var sassMiddleware = require('node-sass-middleware');
var flash = require("connect-flash");
var passport = require('passport');

module.exports = function (app) {
    app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    app.use('/mdb', express.static(__dirname + '/node_modules/mdbootstrap'));
    app.use('/', express.static(__dirname + '/public'));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookies());
    app.use(session({secret: 'hackthehack', cookie: {}}));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(sassMiddleware({
        src: path.join(__dirname, 'public'),
        dest: path.join(__dirname, 'public'),
        indentedSyntax: true, // true = .sass and false = .scss
        sourceMap: true
    }));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(flash());
    app.use(function (req, res, next) {
        models(function (err, db) {
            if (err) return next(err);

            req.models = db.models;
            req.db     = db;

            return next();
        });
    })
};