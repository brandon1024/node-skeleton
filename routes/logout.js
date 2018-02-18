/* Retrieve Router Handler */
const express = require('express');
const router = express.Router();

/* Debugger */
const debug = require('debug')('route-logout');

/* Models */


/* Views */

/* API Endpoints */
router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

module.exports = router;
