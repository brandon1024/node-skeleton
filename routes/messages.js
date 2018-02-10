var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    req.models.message.find().limit(4).order('-createdAt').all(function (err, messages) {
        if (err) return next(err);
        res.send({ messages: messages });
    });
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('messaging', { title: 'Express' });
});

module.exports = router;