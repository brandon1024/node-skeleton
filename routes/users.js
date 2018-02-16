/* Retrieve Router Handler */
const express = require('express');
const router = express.Router();
const debug = require('debug')('route-user');

/* Views */


/* API Endpoints */
router.get('/', function (req, res, next) {
    req.models.user.find().all(function (err, users) {
        if (err)
            return next(err);

        res.send(users);
    });
});


module.exports = router;