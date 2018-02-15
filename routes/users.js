/* Retrieve Router Handler */
var express = require('express');
var router = express.Router();

/* Views */


/* API Endpoints */
router.get('/', function (req, res, next) {
    req.models.user.find().all(function (err, users) {
        if (err) return next(err);
        res.send(users);
    });
});


module.exports = router;