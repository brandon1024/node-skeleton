const crypto = require('crypto');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../../models/user');

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

            /* Salt and Hash Password */
            let salt = user.attributes.salt;
            let hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('ascii');

            if(hash !== user.attributes.hash)
                return next(null, null, {message: 'Incorrect username or password.'});

            return next(null, user, {});
        }).catch(function(err) {
            return next(err);
        });
    }
);