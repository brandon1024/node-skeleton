var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function () {
    passport.use('register', new LocalStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done) {
            findOrCreateUser = function() {
                req.models.user.find({'username': username},function(err, user) {
                    if (err){
                        return done(err);
                    }

                    if (user) {
                        return done(null, false, req.flash('message','User Already Exists'));
                    } else {
                        req.models.user.create({
                            username: username,
                            password: password
                        }, function (err, user) {
                            if(err) throw err;

                            return done(null, user);
                        });
                    }
                });
            };

            process.nextTick(findOrCreateUser);
        }
    ));

    passport.use('login', new LocalStrategy({
        passReqToCallback: true
    }, function(req, username, password, done) {
        req.models.user.find({ username: username }).one(function(err, user) {
            if (err) { return done(err); }

            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.authenticate(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }

            return done(null, user);
        });
    }));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(req, id, done) {
        req.models.user.find({id: id}).one(function (err, user) {
            done(null, user);
        });
    });
};

