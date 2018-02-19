/* Retrieve Router Handler */
const express = require('express');
const router = express.Router();

/* Debugger */
const debug = require('debug')('route-index');

module.exports = (app, passport) => {
    /* Views */
    router.get('/', function(req, res, next) {
        res.render('index', {
            title: 'APP TITLE',
            navbar: {
                title: 'APP TITLE NAV',
                links: [
                    {title: 'Home', url: '/'},
                    {title: 'Login', url: '/login'},
                    {title: 'Sign Up', url: '/signup'},
                    {title: 'About', url: '/'},
                    {title: 'Help', url: '/'}]
            }
        });
    });


    /* API Endpoints */

    /* Register Router */
    app.use('/', router);
};

