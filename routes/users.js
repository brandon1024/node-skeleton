/* Router, Models, Middleware */
const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const debug = require('debug')('route-user');
const User = require('../models/user');

/* Validator */
const userValidator = require('../services/validation/user-validation');


module.exports = (app, passport) => {
    function authenticate(req, res, next) {
        if(req.isAuthenticated())
            return next();

        req.session.redirectTo = req.originalUrl;
        res.redirect('/login')
    }

    function authenticateAdmin(req, res, next) {
        if (req.isAuthenticated() && req.user.attributes.role === User.ROLE_ADMIN)
            return next();

        res.status(403).send("Insufficient permissions.");
    }


    /* API Endpoints */
    router.get('/find', authenticateAdmin, (req, res, next) => {
        let id = req.param('id');
        let email = req.param('email');
        let emailSecondary = req.param('email_secondary');
        let username = req.param('username');
        let firstName = req.param('first_name');
        let lastName = req.param('last_name');
        let role = req.param('role');

        let query = {};
        if(id)
            query.id = id;
        if(email)
            query.email = email;
        if(emailSecondary)
            query.email_secondary = emailSecondary;
        if(username)
            query.username = username;
        if(firstName)
            query.first_name = firstName;
        if(lastName)
            query.last_name = lastName;
        if(role)
            query.role = role;

        User.query().where(query).select('id', 'username', 'email', 'email_secondary', 'first_name', 'last_name', 'email_validated', 'role').then((user) => {
            return res.send(user);
        }).catch((err) => {
            return res.status(500).send('Internal server error.');
        });
    });

    router.post('/create', authenticateAdmin, (req, res, next) => {
        if(!req.body)
            return res.status(400).send('No request body.');

        let username = req.body['username'];
        let email = req.body['email'];
        let emailSecondary = req.body['email_secondary'];
        let password = req.body['password'];
        let firstName = req.body['first_name'];
        let lastName = req.body['last_name'];
        let role = req.body['role'];

        /* Validate Parameters */
        let message;
        if(message = userValidator.validateUsername(username))
            return res.status(400).send(message);
        if(message = userValidator.validateEmail(email))
            return res.status(400).send(message);
        if(message = userValidator.validatePassword(password))
            return res.status(400).send(message);

        let newUser = {
            username: username.toLowerCase(),
            email: email
        };

        /* Optional Parameters */
        if(emailSecondary && (message = userValidator.validateEmail(emailSecondary)))
            return res.status(400).send(message);
        if(emailSecondary)
            newUser.email_secondary = emailSecondary;

        if(role && role !== User.ROLE_ADMIN && role !== User.ROLE_USER)
            return res.status(400).send('Invalid role specified.');
        else if(!role)
            newUser.role = User.ROLE_USER;

        if(firstName)
            newUser.first_name = firstName;
        if(lastName)
            newUser.last_name = lastName;

        /* Determine if User Exists */
        User.query({where: {username: newUser.username}, orWhere: {email: newUser.email}}).fetch().then((user) => {
            if(user)
                return res.status(400).send('User already exists.');

            /* Salt and Hash Password */
            newUser.salt = crypto.randomBytes(64).toString('ascii');
            newUser.hash = crypto.pbkdf2Sync(password, newUser.salt, 10000, 64, 'sha512').toString('ascii');

            /* Create User Record */
            return User.forge(newUser).save();
        }).then((model) => {
            if(model)
                return res.send('Successfully created user.');
        }).catch((err) => {
            return res.status(500).send('Internal server error.');
        });
    });

    router.post('/update', authenticateAdmin, (req, res, next) => {
        if(!req.body)
            return res.status(400).send('No request body.');
        if(!req.body['id'])
            return res.status(400).send('Must specify user id.');

        let id = req.body['id'];
        let username = req.body['username'];
        let email = req.body['email'];
        let emailSecondary = req.body['email_secondary'];
        let password = req.body['password'];
        let firstName = req.body['first_name'];
        let lastName = req.body['last_name'];
        let role = req.body['role'];

        /* Validate Parameters */
        let message;
        if(message = userValidator.validateUsername(username))
            return res.status(400).send(message);
        if(message = userValidator.validateEmail(email))
            return res.status(400).send(message);
        if(message = userValidator.validatePassword(password))
            return res.status(400).send(message);

        /* Optional Parameters */
        if(emailSecondary && (message = userValidator.validateEmail(emailSecondary)))
            return res.status(400).send(message);

        if(role && role !== User.ROLE_ADMIN && role !== User.ROLE_USER)
            return res.status(400).send('Invalid role specified.');
        else if(!role)
            role = User.ROLE_USER;

        /* Find User to Update */
        User.byId(id).then((user) => {
            if(!user)
                return res.status(400).send('No user exists with id ' + id);

            /* Forge Updated User*/
            let update = {};
            if(username)
                update.username = username;
            if(email)
                update.email = email;
            if(emailSecondary)
                update.email_secondary = emailSecondary;
            if(password) {
                update.salt = crypto.randomBytes(64).toString('ascii');
                update.hash = crypto.pbkdf2Sync(password, update.salt, 10000, 64, 'sha512').toString('ascii');
            }
            if(firstName)
                update.first_name = firstName;
            if(lastName)
                update.last_name = lastName;
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

                return User.query(query).fetch().then((user) => {
                    if(user) {
                        res.status(400).send('User with that username or email already exists.');
                        return;
                    }

                    return User.forge({id: id}).save(update);
                });
            }
            else
                return User.forge({id: id}).save(update);
        }).then((model) => {
            if(model)
                return res.send("Successfully updated user.");
        }).catch((err) => {
            return res.status(500).send('Internal server error.');
        });
    });

    router.post('/delete', authenticateAdmin, (req, res, next) => {
        if (!req.body)
            return res.status(400).send('No request body.');
        if(!req.body['id'])
            return res.status(400).send('Must specify user id.');

        let id = req.body['id'];

        /* Destroy User Record */
        User.forge({id: id}).destroy().then(() => {
            return res.send("User record deleted.");
        }).catch((err) => {
            return res.status(500).send('Internal server error.');
        });
    });

    /* Register Router */
    app.use('/users', router);
};