/* Middleware Definitions */
const debug = require('debug')('authentication');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');

module.exports = function () {
    /* Create User Strategy */
    passport.use('signup', new LocalStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done) {
            debug('create user with username: ' + username);

            process.nextTick(function() {
                User.byUsername(username).then(function (user) {
                    if (user) {
                        debug('user with username already exists: ' + user);
                        return done(null, false, req.flash('message','User Already Exists'));
                    }

                    User.create({
                        username: username,
                        password: password
                    }).then(function () {
                        return User.byUsername(username);
                    }).then(function (user) {
                        return done(null, user);
                    });
                });
            });
        }
    ));

    /* User Authentication Strategy */
    passport.use('login', new LocalStrategy({
        passReqToCallback: true
    }, function(req, username, password, done) {
        User.byUsername(username).then(function (user) {
            if (!user) {
                return done(null, false, {message: 'Incorrect username.'});
            }

            if (!user.authenticate(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }

            return done(null, user);
        });
    }));

    /* User Serialization */
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    /* User Deserialization */
    passport.deserializeUser(function(req, user, done) {
        done(null, user);
    });
};

