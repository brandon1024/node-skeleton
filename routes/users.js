/* Retrieve Router Handler */
const express = require('express');
const router = express.Router();

/* Debugger */
const debug = require('debug')('route-user');

/* Models */
const User = require('../models/user');

/* bcrypt */
const bcrypt = require('bcryptjs');


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

        let query = User.query();

        if(id)
            query = query.where('id', id);
        else if(email)
            query = query.where('email', email);
        else if(username)
            query = query.where('username', username);

        query.select('id', 'username', 'email', 'email_validated', 'role').then(function(user) {
            return res.send(user);
        }).catch(function(err) {
            debug(err);
            return res.sendStatus(500).send("Woops, something went wrong.");
        });
    });

    router.post('/create', authenticateAdmin, function (req, res, next) {
        if(!req.body)
            return res.sendStatus(400);
        if(!req.body['username'])
            return res.sendStatus(400);
        if(!req.body['email'])
            return res.sendStatus(400);
        if(!req.body['password'])
            return res.sendStatus(400);

        let username = req.body['username'];
        let email = req.body['email'];
        let password = req.body['password'];
        let role = req.body['role'];

        if(role && role !== User.ROLE_ADMIN && role !== User.ROLE_USER)
            return res.sendStatus(400);
        else if(!role)
            role = User.ROLE_USER;

        User.query({where: {username: username}, orWhere: {email: email}}).fetch().then(function(user) {
            if(user)
                return res.sendStatus(400);

            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(password, salt);

            return User.forge({username: username, email: email, hash: hash, salt: salt, role: role}).save().then(function(model) {
                    return res.send("Successfully created user.");
                }).catch(function (err) {
                    debug(err);
                    return res.sendStatus(500).send("Woops, something went wrong.");
                });
        }).catch(function(err) {
            debug(err);
            return res.sendStatus(500).send("Woops, something went wrong.");
        });
    });

    router.post('/update', authenticateAdmin, function (req, res, next) {
        if(!req.body)
            return res.sendStatus(400);
        if(!req.body['id'])
            return res.sendStatus(400);

        let id = req.body['id'];
        let username = req.body['username'];
        let email = req.body['email'];
        let password = req.body['password'];
        let role = req.body['role'];

        if(role && role !== User.ROLE_ADMIN && role !== User.ROLE_USER)
            return res.sendStatus(400);
        else if(!role)
            role = User.ROLE_USER;

        User.byId(id).fetch().then(function(user) {
            if(!user)
                return res.sendStatus(400);

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

            if(username || email) {
                let query = {};
                if(username)
                    query.where = {username: username};

                if(email && !username)
                    query.where = {email: email};
                else if(email)
                    query.orWhere = {email: email};

                return User.query(query).fetch().then(function(user) {
                    if(user)
                        return res.sendStatus(400);

                    return User.forge({id: id}).save(update).then(function() {
                        return res.send("Successfully updated user.");
                    }).catch(function (err) {
                        debug(err);
                        return res.sendStatus(500).send("Woops, something went wrong.");
                    });
                }).catch(function(err) {
                    debug(err);
                    return res.sendStatus(500).send("Woops, something went wrong.");
                });
            }
            else {
                return User.forge({id: id}).save(update).then(function() {
                    return res.send("Successfully updated user.");
                }).catch(function (err) {
                    debug(err);
                    return res.sendStatus(500).send("Woops, something went wrong.");
                });
            }
        }).catch(function(err) {
            debug(err);
            return res.sendStatus(500).send("Woops, something went wrong.");
        });
    });

    router.post('/delete', authenticateAdmin, function (req, res, next) {
        if (!req.body)
            return res.sendStatus(400);
        if(!req.body['id'])
            return res.sendStatus(400);

        let id = req.body['id'];

        User.forge({id: id}).destroy().then(function () {
            return res.send("User record deleted.")
        }).catch(function (err) {
            debug(err);
            return res.sendStatus(500).send("Woops, something went wrong.");
        });
    });

    /* Register Router */
    app.use('/users', router);
};