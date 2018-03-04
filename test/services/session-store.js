const knex = require('../../config/db/bookshelf').knex;
const session = require('express-session');
session({
    secret: 'hackthehack',
    resave: true,
    saveUninitialized: false,
    maxAge: 86400000
});

const SessionStore = require('../../services/session-store')(session);
const sess = new SessionStore(knex);

sess.set('test', {test: 'testobj'}, () => {});