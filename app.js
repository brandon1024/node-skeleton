/* Application */
const express = require('express');
const path = require('path');
const app = express();

/* Middleware Definitions */
const debug = require('debug')('app');
const passport = require('passport');


/* App Views and View Engine */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

/* Configure Middleware */
require('./db/bookshelf');
require('./middleware')(app);
require('./authentication')(app, passport);

/* Expose and Serve Static Files */
app.use('/mdb', express.static(__dirname + '/node_modules/mdbootstrap'));
app.use('/', express.static(__dirname + '/public'));
app.use('/favicon.ico', express.static('/public/images/favicon.ico'));

/* Configure Route Handlers */
require('./routes/index')(app, passport);
require('./routes/login')(app, passport);
require('./routes/signup')(app, passport);
require('./routes/users')(app, passport);
require('./routes/logout')(app, passport);
require('./routes/dashboard')(app, passport);

/* Implement Error Handler */
require('./error-handler')(app);

module.exports = app;
