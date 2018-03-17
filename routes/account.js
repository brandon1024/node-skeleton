/* Retrieve Router Handler */
const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const User = require('../models/user');

/* Debugger */
const debug = require('debug')('route-home');

/* Validator */
const userValidator = require('../services/validation/user-validation');

module.exports = (app, passport) => {
    function authenticate(req, res, next) {
        if (req.isAuthenticated())
            return next();

        req.session.redirectTo = req.originalUrl;
        res.redirect('/login');
    }

    /* Views */
    router.get('/', authenticate, (req, res, next) => {
        User.byId(req.user.id).then((user) => {
            if(user)
                return res.render('account', {
                    authenticated: req.isAuthenticated(),
                    message: req.flash('message'),
                    error: req.flash('error'),
                    email_primary: user.attributes.email,
                    email_secondary: user.attributes.email_secondary,
                    username: user.attributes.username,
                    first_name: user.attributes.first_name,
                    last_name: user.attributes.last_name
                });

            res.render('account', {
                authenticated: req.isAuthenticated(),
                message: req.flash('message'),
                error: req.flash('error')
            });
        }).catch(() => {
            res.render('account', {
                authenticated: req.isAuthenticated(),
                message: req.flash('message'),
                error: req.flash('error')
            });
        });
    });

    /* API Endpoints */
    router.post('/change-password', authenticate, (req, res, next) => {
        if(!req.body) {
            req.flash('error', 'Something went wrong. Please try again later.');
            return res.redirect('/account');
        }

        let oldPass = req.body['old-password'];
        let newPass = req.body['new-password'];
        let newPassConfirm = req.body['new-password-confirm'];

        let message = false;
        if(newPass !== newPassConfirm)
            message = 'Passwords do not match.';
        else
            message = userValidator.validatePassword(newPass);

        if(message) {
            req.flash('error', message);
            return res.redirect('/account');
        }

        User.byId(req.user.id).then((user) => {
            if(!user) {
                req.flash('error', 'Something went wrong. Please try again later.');
                return res.redirect('/account');
            }

            let salt = user.attributes.salt;
            let hash = crypto.pbkdf2Sync(oldPass, salt, 10000, 64, 'sha512').toString('ascii');

            if(hash !== user.attributes.hash) {
                req.flash('error', 'Incorrect password. Please try again.');
                return res.redirect('/account');
            }

            /* Forge Updated User*/
            salt = crypto.randomBytes(64).toString('ascii');
            hash = crypto.pbkdf2Sync(newPass, salt, 10000, 64, 'sha512').toString('ascii');

            return User.forge({id: req.user.id}).save({salt: salt, hash: hash});
        }).then(() => {
            req.flash('message', 'Successfully changed password.');
            return res.redirect('/account');
        }).catch(() => {
            req.flash('error', 'Something went wrong. Please try again later.');
            return res.redirect('/account');
        });
    });

    router.post('/change-account-info', authenticate, (req, res, next) => {
        if(!req.body) {
            req.flash('error', 'Something went wrong. Please try again later.');
            return res.redirect('/account');
        }

        let id = req.user.id;
        let email = req.body['email'];
        let emailSecondary = req.body['email_secondary'];
        let username = req.body['username'];
        let firstName = req.body['first_name'];
        let lastName = req.body['last_name'];

        /* Validate Parameters */
        let message;
        if(username)
            message = userValidator.validateUsername(username);
        if(email)
            message = userValidator.validateEmail(email);
        if(emailSecondary)
            message = userValidator.validateEmail(emailSecondary);

        if(message) {
            req.flash('error', message);
            return res.redirect('/account');
        }

        /* Find User to Update */
        User.byId(id).then((user) => {
            if(!user) {
                req.flash('error', 'Something went wrong. Please try again later.');
                return res.redirect('/account');
            }

            /* Forge Updated User*/
            let update = {};
            if(username)
                update.username = username.toLowerCase();
            if(email)
                update.email = email;
            if(emailSecondary)
                update.email_secondary = emailSecondary;
            if(firstName)
                update.first_name = firstName;
            if(lastName)
                update.last_name = lastName;

            /* Verify Username and Email Not Taken */
            if((username && username !== req.user.attributes.username) || (email && email !== req.user.attributes.email)) {
                let query;
                if(username && !email)
                    query = {where: {username: username}};
                else if(email && !username)
                    query = {where: {email: email}};
                else
                    query = {where: {username: username}, orWhere: {email: email}};

                return User.query(query).fetch().then((user) => {
                    if(user) {
                        req.flash('error', 'A user with that username or email already exists.');
                        return res.redirect('/account');
                    }

                    return User.forge({id: id}).save(update);
                });
            }
            else
                return User.forge({id: id}).save(update);
        }).then(() => {
            req.flash('message', 'Successfully updated your account information.');
            return res.redirect('/account');
        }).catch(() => {
            req.flash('error', 'Something went wrong. Please try again later.');
            return res.redirect('/account');
        });
    });

    router.post('/delete-account', authenticate, (req, res, next) => {
        if(!req.body) {
            req.flash('error', 'Something went wrong. Please try again later.');
            return res.redirect('/account');
        }

        let password = req.body['account-deletion-password'];

        User.byId(req.user.id).then((user) => {
            let salt = user.attributes.salt;
            let hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('ascii');

            if(hash !== user.attributes.hash) {
                req.flash('error', 'Incorrect password. Please try again.');
                return res.redirect('/account');
            }

            /* Destroy User Record */
            User.forge({id: req.user.id}).destroy().then(() => {
                return res.redirect('/login');
            }).catch((err) => {
                req.flash('error', 'Something went wrong. Please try again later.');
                return res.redirect('/account');
            });
        }).catch(() => {
            req.flash('error', 'Something went wrong. Please try again later.');
            return res.redirect('/account');
        });
    });

    app.use('/account', router);
};