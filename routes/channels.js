var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    req.models.channel.find().order('-id').all(function (err, channels) {
        if (err) return next(err);
        res.send(channels);
    });
});

router.post('/', function (req, res, next) {
    var params = {};
    req.models.channel.create(params, function (err, channel) {
        if(err) return next(err);
        return res.send(200, channel);
    });
});

module.exports = router;