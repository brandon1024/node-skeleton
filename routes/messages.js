var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    req.models.message.find().limit(4).order('-createdAt').all(function (err, messages) {
        if (err) return next(err);
        res.send({ messages: messages });
    });
});

router.post('/',function (req, res, next) {
    var params = _.pick(req.body, 'body');

    eq.models.message.create(params, function (err, message) {
        if(err) {
            return next(err);
        }
        return res.send(200, message);
    });
});

module.exports = router;

