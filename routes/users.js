/* Retrieve Router Handler */
const express = require('express');
const router = express.Router();

/* Debugger */
const debug = require('debug')('route-user');

/* Models */
const User = require('../models/user');

/* Request Body Parser */
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

/* bcrypt */
const bcrypt = require('bcryptjs');


module.exports = (app, passport) => {
    function authenticate(req, res, next) {
        if (req.isAuthenticated())
            return next();

        res.redirect('/login')
    }

    /* Views */


    /* API Endpoints */
    /* urlencoded */
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

        query.select('username', 'email', 'email_validated', 'role').then(function(user) {
            res.send(user);
        }).catch(function(err) {
            res.send("Woops, something went wrong.");
            debug(err);
        });
    });

    /* application/x-www-form-urlencoded */
    router.post('/create', authenticate, function (req, res, next) {
        if (!req.body)
            return res.sendStatus(400);

        if(!req.body.username)
            return res.sendStatus(400);
        if(!req.body.email)
            return res.sendStatus(400);
        if(!req.body.password)
            return res.sendStatus(400);

        /* Salt and Hash Password */
        let salt = bcrypt.genSaltSync(25);
        let hash = bcrypt.hashSync(req.body.password, salt);

        User.forge({username: req.body.username, email: req.body.email, hash: hash, salt: salt})
        .save().then(function () {
            res.send("User record saved!");
        }).catch(function (err) {
            res.send("Woops, something went wrong.");
            debug(err);
        });
    });

    router.post('/update', authenticate, function (req, res, next) {
        if (!req.body)
            return res.sendStatus(400);

        if(!req.body.username)
            return res.sendStatus(400);
        if(!req.body.email)
            return res.sendStatus(400);
        if(!req.body.password)
            return res.sendStatus(400);

        User.forge({username: req.body.username, email: req.body.email, password: req.body.password}).save()
            .then(function () {
                res.send("User record saved!")
            }).catch(function (err) {
            res.send("Woops, something went wrong.");
            debug(err);
        });
    });

    router.post('/delete', authenticate, function (req, res, next) {
        if (!req.body)
            return res.sendStatus(400);

        if(!req.body.username)
            return res.sendStatus(400);
        if(!req.body.email)
            return res.sendStatus(400);
        if(!req.body.password)
            return res.sendStatus(400);

        User.forge({username: req.body.username, email: req.body.email, password: req.body.password}).save()
            .then(function () {
                res.send("User record saved!")
            }).catch(function (err) {
            res.send("Woops, something went wrong.");
            debug(err);
        });
    });

    /* Register Router */
    app.use('/users', router);
};