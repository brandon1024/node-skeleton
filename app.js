/* Application */
const express = require('express');
const path = require('path');
const app = express();

/* Middleware Definitions */
const debug = require('debug')('app');

/* Middleware Services */
const middleware = require('./middleware');
const authentication = require('./authentication');
const errorHandler = require('./error-handler');

/* Route Definitions */
const index = require('./routes/index');
const login = require('./routes/login');
const signup = require('./routes/signup');
const users = require('./routes/users');
const logout = require('./routes/logout');
const dashboard = require('./routes/dashboard');

/* App Views and View Engine */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

/* Configure Middleware */
middleware(app);
authentication();

/* Expose and Serve Static Files */
app.use('/mdb', express.static(__dirname + '/node_modules/mdbootstrap'));
app.use('/', express.static(__dirname + '/public'));

function authenticate(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/login')
}

/* Route Handlers Not Requiring Auth */
app.use('/', index);
app.use('/logout', logout);
app.use('/login', login);
app.use('/signup', signup);

/* Route Handlers Requiring Auth */
app.use(authenticate);
app.use('/users', users);
app.use('/dashboard', dashboard);

/* Implement Error Handler */
errorHandler(app);

module.exports = app;
