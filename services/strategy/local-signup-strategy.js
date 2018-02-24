const LocalStrategy = require('passport-local').Strategy;
const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const userValidator = require('../validation/user-validation');

const LOCAL_STRATEGY_CONFIG = {
    usernameField: 'username',
    passwordField: 'password',
    session: true,
    passReqToCallback: true
};

module.exports = new LocalStrategy(LOCAL_STRATEGY_CONFIG,
    function(req, _i1, _i2, next) {
        if(!req.body)
            return next(null, null, {message: 'Bad Request (500).'});

        let username = req.body['username'];
        let password = req.body['password'];
        let email = req.body['email'];
        let passwordconfirm = req.body['password-confirm'];

        /* Verify Correct Parameters */
        let message;
        if(message = userValidator.validateUsername(username))
            return next(null, null, {message: message});
        if(message = userValidator.validateEmail(email))
            return next(null, null, {message: message});
        if(message = userValidator.validatePassword(password))
            return next(null, null, {message: message});
        if(message = userValidator.validatePassword(passwordconfirm))
            return next(null, null, {message: message});

        if(password !== passwordconfirm)
            return next(null, null, {message: 'Passwords do not match.'});

        username = username.toLowerCase();

        User.query({where: {username: username}, orWhere: {email: email}}).fetch().then(function(user) {
            if(user)
                return next(null, null, {message: 'That username or email address is taken.'});

            /* Salt and Hash Password */
            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(password, salt);

            return User.forge({username: username, email: email, hash: hash, salt: salt})
                .save().then(function(model) {
                    return next(null, model.attributes, {});
                }).catch(function (err) {
                    debug(err);
                    return next(err);
                });
        }).catch(function(err) {
            return next(err);
        });
    }
);