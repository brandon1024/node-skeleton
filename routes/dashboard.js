/* Retrieve Router Handler */
const express = require('express');
const router = express.Router();

/* Debugger */
const debug = require('debug')('route-home');

/* Models */


/* Views */
router.get('/', function(req, res, next) {
    res.render('dashboard', {
        title: 'APP TITLE - Dashboard',
        navbar: {
            title: 'APP TITLE NAV',
            links: [
                {title: 'Home', url: '/'},
                {title: 'About', url: '/'},
                {title: 'Help', url: '/'}]
        }
    });
});


/* API Endpoints */


module.exports = router;
