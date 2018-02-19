/* Middleware Definitions */
const debug = require('debug')('authentication');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');
const bcrypt = require('bcryptjs');

module.exports = function (app, passport) {
    const LOCAL_STRATEGY_CONFIG = {
        usernameField: 'email',
        passwordField: 'password',
        session: true,
        passReqToCallback: true
    };

    /* User Login Strategy */
    passport.use('login', new LocalStrategy(LOCAL_STRATEGY_CONFIG,
        function(req, usernameOrEmail, password, next) {
            User.findByUsernameOrEmail(usernameOrEmail).then(function(user) {
                if(!user)
                    return next(null, false, req.flash('loginMessage', 'Incorrect username or password.'));

                if(bcrypt.compareSync(password, user.hash))
                    return next(null, false, req.flash('loginMessage', 'Incorrect username or password.'));

                return next(null, user);
            }).catch(function(err) {
                debug(err);
                return next(err);
            });
        }
    ));

    /* User Sign Up Strategy */
    passport.use('signup', new LocalStrategy(LOCAL_STRATEGY_CONFIG,
        function(req, username, password, next) {
            if(!req.body.email)
                return next(new Error('email not specified'));

            /* Salt and Hash Password */
            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(password, salt);

            User.forge({username: username, email: req.body.email, hash: hash, salt: salt})
            .save().then(function(model) {
                return next(null, model.attributes, {});
            }).catch(function (err) {
                debug(err);
                return next(err, null, req.flash('signupMessage', 'Something went wrong.'));
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

