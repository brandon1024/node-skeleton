/* Middleware Definitions */
const debug = require('debug')('authentication');
const User = require('../models/user');
const loginStrategy = require('../services/strategy/local-login-strategy');
const signupStrategy = require('../services/strategy/local-signup-strategy');

module.exports = function (app, passport) {
    /* User Sign Up Strategy */
    passport.use('signup', signupStrategy);

    /* User Login Strategy */
    passport.use('login', loginStrategy);

    /* User Serialization */
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    /* User Deserialization */
    passport.deserializeUser(function(id, done) {
        User.byId(id).then(function(user) {
            done(null, user);
        }).catch(function(err) {
            debug(err);
            done(err, null);
        });
    });

    app.use(passport.initialize());
    app.use(passport.session());
};

