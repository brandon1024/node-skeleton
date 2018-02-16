var express = require('express');
var path = require('path');
var middleware = require('./middleware');
var authentication = require('./authentication');
var errorHandler = require('./error-handler');

var index = require('./routes/index');
var login = require('./routes/login');
var signup = require('./routes/signup');
var users = require('./routes/users');
var logout = require('./routes/logout');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

middleware(app);
authentication();

function authenticate(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login')
}

app.use('/', index);
app.use('/logout', logout);
app.use('/login', login);
app.use('/signup', signup);

app.use(authenticate);
app.use('/users', users);

errorHandler(app);

module.exports = app;
