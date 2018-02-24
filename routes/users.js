/* Retrieve Router Handler */
const express = require('express');
const router = express.Router();

/* Debugger */
const debug = require('debug')('route-user');

/* Models */
const User = require('../models/user');

/* bcrypt */
const bcrypt = require('bcryptjs');

/* Validator */
const userValidator = require('../services/validation/user-validation');


module.exports = (app, passport) => {
    function authenticate(req, res, next) {
        if (req.isAuthenticated())
            return next();

        res.redirect('/login')
    }

    function authenticateAdmin(req, res, next) {
        if (req.isAuthenticated() && req.user.attributes.role === User.ROLE_ADMIN)
            return next();

        res.status(403).send("Insufficient permissions.");
    }

    /* Views */


    /* API Endpoints */
    router.get('/find', authenticate, function (req, res, next) {
        let id = req.param('id');
        let email = req.param('email');
        let username = req.param('username');

        let query = {};
        if(id)
            query.id = id;
        if(email)
            query.email = email;
        else if(username)
            query.username = username;

        User.query().where(query).select('id', 'username', 'email', 'email_validated', 'role').then(function(user) {
            return res.send(user);
        }).catch(function(err) {
            debug(err);
            return res.sendStatus(500).send('Internal server error.');
        });
    });

    router.post('/create', authenticateAdmin, function (req, res, next) {
        if(!req.body)
            return res.sendStatus(400).send('No request body.');

        let username = req.body['username'];
        let email = req.body['email'];
        let password = req.body['password'];
        let role = req.body['role'];

        let message;

        /* Validate Parameters */
        if(message = userValidator.validateUsername(username))
            return res.sendStatus(400).send(message);
        if(message = userValidator.validateEmail(email))
            return res.sendStatus(400).send(message);
        if(message = userValidator.validatePassword(password))
            return res.sendStatus(400).send(message);

        if(role && role !== User.ROLE_ADMIN && role !== User.ROLE_USER)
            return res.sendStatus(400).send('Invalid role specified.');
        else if(!role)
            role = User.ROLE_USER;

        username = username.toLowerCase();

        /* Determine if User Exists */
        User.query({where: {username: username}, orWhere: {email: email}}).fetch().then(function(user) {
            if(user)
                return res.sendStatus(400).send('User already exists.');

            /* Salt and Hash Password */
            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(password, salt);

            /* Create User Record */
            return User.forge({username: username, email: email, hash: hash, salt: salt, role: role})
                .save().then(function(model) {
                    return res.send('Successfully created user.');
                }).catch(function (err) {
                    debug(err);
                    return res.sendStatus(500).send('Internal server error.');
                });
        }).catch(function(err) {
            return res.sendStatus(500).send('Internal server error.');
        });
    });

    router.post('/update', authenticateAdmin, function (req, res, next) {
        if(!req.body)
            return res.sendStatus(400).send('No request body.');
        if(!req.body['id'])
            return res.sendStatus(400).send('Must specify user id.');

        let id = req.body['id'];
        let username = req.body['username'];
        let email = req.body['email'];
        let password = req.body['password'];
        let role = req.body['role'];

        /* Validate Parameters */
        let message;
        if(message = userValidator.validateUsername(username))
            return res.sendStatus(400).send(message);
        if(message = userValidator.validateEmail(email))
            return res.sendStatus(400).send(message);
        if(message = userValidator.validatePassword(password))
            return res.sendStatus(400).send(message);

        if(role && role !== User.ROLE_ADMIN && role !== User.ROLE_USER)
            return res.sendStatus(400).send('Invalid role specified.');
        else if(!role)
            role = User.ROLE_USER;

        username = username.toLowerCase();

        /* Find User to Update */
        User.byId(id).fetch().then(function(user) {
            if(!user)
                return res.sendStatus(400).send('No user exists with id ' + id);

            /* Forge Updated User*/
            let update = {};
            if(username)
                update.username = username;
            if(email)
                update.email = email;
            if(password) {
                let salt = bcrypt.genSaltSync(10);
                update.hash = bcrypt.hashSync(password, salt);
                update.salt = salt;
            }
            if(role)
                update.role = role;

            /* Verify Username and Email Not Taken */
            if(username || email) {
                let query;
                if(username && !email)
                    query = {where: {username: username}};
                else if(email && !username)
                    query = {where: {email: email}};
                else
                    query = {where: {username: username}, orWhere: {email: email}};

                return User.query(query).fetch().then(function(user) {
                    if(user)
                        return res.sendStatus(400);

                    return User.forge({id: id}).save(update).then(function() {
                        return res.send("Successfully updated user.");
                    }).catch(function (err) {
                        debug(err);
                        return res.sendStatus(500).send('Internal server error.');
                    });
                }).catch(function(err) {
                    debug(err);
                    return res.sendStatus(500).send('Internal server error.');
                });
            }
            else {
                return User.forge({id: id}).save(update).then(function() {
                    return res.send("Successfully updated user.");
                }).catch(function (err) {
                    debug(err);
                    return res.sendStatus(500).send('Internal server error.');
                });
            }
        }).catch(function(err) {
            debug(err);
            return res.sendStatus(500).send('Internal server error.');
        });
    });

    router.post('/delete', authenticateAdmin, function (req, res, next) {
        if (!req.body)
            return res.sendStatus(400).send('No request body.');
        if(!req.body['id'])
            return res.sendStatus(400).send('Must specify user id.');

        let id = req.body['id'];

        /* Destroy User Record */
        User.forge({id: id}).destroy().then(function () {
            return res.send("User record deleted.")
        }).catch(function (err) {
            debug(err);
            return res.sendStatus(500).send('Internal server error.');
        });
    });

    /* Register Router */
    app.use('/users', router);
};