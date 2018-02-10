var express = require('express');
var path = require('path');
var middleware = require('./middleware');

var index = require('./routes/index');
var users = require('./routes/users');
var channels = require('./routes/channels');
var messages = require('./routes/messages');
var login = require('./routes/login');
var messaging = require('./routes/messaging');
var registration = require('./routes/registration');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

middleware(app);


app.use('/', index);
app.use('/users', users);
app.use('/channels', channels);
app.use('/messages', messages);
app.use('/login', login);
app.use('/register', registration);
app.use('/me', messaging);

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
