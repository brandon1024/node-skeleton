/* Retrieve Router Handler */
const express = require('express');
const router = express.Router();
const debug = require('debug')('route-home');

/* Views */
router.get('/', function(req, res, next) {
    res.render('dashboard', {
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


module.exports = router;
