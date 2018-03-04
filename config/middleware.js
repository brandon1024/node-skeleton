/* Application */
const path     = require('path');

/* Middleware Definitions */
const httplogger = require('morgan');
const session = require('express-session');
const bodyParser = require('body-parser');
const sassMiddleware = require('node-sass-middleware');
const flash = require("connect-flash");
const debug = require('debug')('middleware-config');

const knex = require('./db/bookshelf').knex;
const SessionStore = require('../services/session-store')(session);
const store = new SessionStore(knex, {tablename: 'sessions', maxAge: 86400000});

module.exports = function (app) {
    /* Configure Middleware */
    if(process.env.NODE_ENV !== 'test')
        app.use(httplogger('dev'));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(session({
        secret: 'hackthehack',
        resave: true,
        saveUninitialized: false,
        maxAge: 86400000,
        store: store
    }));

    app.use(flash());
    app.use(sassMiddleware({
        src: path.join(__dirname, '..', 'public'),
        dest: path.join(__dirname, '..', 'public'),
        indentedSyntax: true,
        sourceMap: true
    }));
};