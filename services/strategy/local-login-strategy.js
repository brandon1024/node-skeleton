const LocalStrategy = require('passport-local').Strategy;
const User = require('../../models/user');
const bcrypt = require('bcryptjs');

const LOCAL_STRATEGY_CONFIG = {
    usernameField: 'username',
    passwordField: 'password',
    session: true,
    passReqToCallback: true
};

module.exports = new LocalStrategy(LOCAL_STRATEGY_CONFIG,
    function(req, username, password, next) {
        User.findByUsername(username.toLowerCase()).then(function(user) {
            if(!user)
                return next(null, null, {message: 'Incorrect username or password.'});

            if(!bcrypt.compareSync(password, user.attributes.hash))
                return next(null, null, {message: 'Incorrect username or password.'});

            return next(null, user, {});
        }).catch(function(err) {
            debug(err);
            return next(err);
        });
    }
);