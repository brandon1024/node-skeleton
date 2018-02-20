/* Middleware Definitions */
const debug = require('debug')('authentication');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');
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
            /* Verify Correct Parameters */
            if(!req.body)
                return next(null, null, {message: 'Bad Request (500).'});
            if(!req.body['username'])
                return next(null, null, {message: 'Missing username field.'});
            if(!req.body['email'])
                return next(null, null, {message: 'Missing email field.'});
            if(!req.body['password'])
                return next(null, null, {message: 'Missing password field.'});
            if(!req.body['password-confirm'])
                return next(null, null, {message: 'Missing password confirm field.'});

            let username = req.body['username'];
            let password = req.body['password'];
            let email = req.body['email'];
            let passwordconfirm = req.body['password-confirm'];

            if(password !== passwordconfirm)
                return next(null, null, {message: 'Passwords don\'t match.'});

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
            User.findByUsername(username).then(function(user) {
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
        User.where({id: id}).fetch().then(function(user) {
            done(null, user);
        }).catch(function(err) {
            debug(err);
            done(err, null);
        });
    });

    app.use(passport.initialize());
    app.use(passport.session());
};

