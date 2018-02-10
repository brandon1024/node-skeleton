var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    req.models.user.find().all(function (err, users) {
        if (err) return next(err);
        res.send(users);
    });
});

module.exports = router;