var express = require('express');
var path = require('path');
var middleware = require('./middleware');
var authentication = require('./authentication');
var errorHandler = require('./error-handler');

var index = require('./routes/index');
var login = require('./routes/login');
var register = require('./routes/signup');
var users = require('./routes/users');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

middleware(app);
authentication();

app.use('/', index);
app.use('/login', login);
app.use('/register', register);
app.use('/users', users);

errorHandler(app);

module.exports = app;
