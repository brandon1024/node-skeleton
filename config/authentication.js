/* Middleware Definitions */
const debug = require('debug')('authentication');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcryptjs');

module.exports = function (app, passport) {
    const LOCAL_STRATEGY_CONFIG = {
        usernameField: 'username',
        passwordField: 'password',
        session: true,
        passReqToCallback: true
    };

    /* User Sign Up Strategy */
    passport.use('signup', new LocalStrategy(LOCAL_STRATEGY_CONFIG,
        function(req, _i1, _i2, next) {
            if(!req.body)
                return next(null, null, {message: 'Bad Request (500).'});

            let username = req.body['username'];
            let password = req.body['password'];
            let email = req.body['email'];
            let passwordconfirm = req.body['password-confirm'];

            /* Verify Correct Parameters */
            if(!username)
                return next(null, null, {message: 'Missing username field.'});
            else
                username = username.toLowerCase();

            if(username.match(/[^a-zA-Z0-9\-\_\.]/g))
                return next(null, null, {message: 'Username may only contain letters (a-z, A-Z), numbers (0-9), dashes (-), underscores (_), and periods (.).'});
            if(username.length < 6 || username.length > 32)
                return next(null, null, {message: 'Username must be between 6 and 32 characters long.'});

            if(!email)
                return next(null, null, {message: 'Missing email field.'});
            if(!email.match(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g))
                return next(null, null, {message: 'Invalid email.'});
            if(email.length > 255)
                return next(null, null, {message: 'Email must be no more than 255 characters long.'});

            if(!password)
                return next(null, null, {message: 'Missing password field.'});
            if(password.match(/[^a-zA-Z0-9~`!@#$%^&*()+=_\-{}\[\]\\|:;”’?/<>,.]/g))
                return next(null, null, {message: 'Password may only contain letters (a-z, A-Z), numbers (0-9), and symbols (~`!@#$%^&*()+=_-{}[]|:;”’?/<>,.).'});
            if(password.length < 6 || password.length > 64)
                return next(null, null, {message: 'Password must be between 6 and 64 characters long.'});

            if(!passwordconfirm)
                return next(null, null, {message: 'Missing password confirm field.'});
            if(password !== passwordconfirm)
                return next(null, null, {message: 'Passwords do not match.'});

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
    ));

    /* User Login Strategy */
    passport.use('login', new LocalStrategy(LOCAL_STRATEGY_CONFIG,
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
    ));

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

