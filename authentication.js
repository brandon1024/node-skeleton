/* Middleware Definitions */
const debug = require('debug')('authentication');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

module.exports = function () {
    /* Create User Strategy */
    passport.use('signup', new LocalStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done) {
            debug('create user with username: ' + username);

            process.nextTick(function() {
                req.models.user.find({'username': username}).one(function(err, user) {
                    if (err){
                        debug('signup err: ' + err);
                        return done(err);
                    }

                    if (user) {
                        debug('user with username already exists: ' + user);
                        return done(null, false, req.flash('message','User Already Exists'));
                    }

                    req.models.user.create({
                        username: username,
                        password: password
                    }, function (err, user) {
                        if(err)
                            throw err;

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
        req.models.user.find({ username: username }).one(function(err, user) {
            if (err)
                return done(err);

            if (!user)
                return done(null, false, { message: 'Incorrect username.' });

            if (!user.authenticate(password))
                return done(null, false, { message: 'Incorrect password.' });

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

