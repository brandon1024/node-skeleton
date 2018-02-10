var express = require('express');
var path = require('path');
var middleware = require('./middleware');
var authentication = require('./authentication');

var index = require('./routes/index');
var login = require('./routes/login');
var registration = require('./routes/registration');
var channels = require('./routes/channels');
var messages = require('./routes/messages');
var chat = require('./routes/chat');
var users = require('./routes/users');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use('/mdb', express.static(__dirname + '/node_modules/mdbootstrap'));
app.use('/', express.static(__dirname + '/public'));

middleware(app);
authentication();

app.use('/', index);
app.use('/channels', channels);
app.use('/login', login);
app.use('/register', registration);
app.use('/messages', messages);
app.use('/chat', chat);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
