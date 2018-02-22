module.exports = function (app) {
    app.use(function(req, res, next) {
        let err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    app.use(function(err, req, res, next) {
        let env = req.app.get('env');

        res.locals.message = err.message;
        if(env === 'development' || env === 'test')
            res.locals.error = err;
        else
            res.locals.error = {};

        res.status(err.status || 500);
        res.render('error');
    });
};