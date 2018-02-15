var models = require('../models');

models(function (err, db) {
    if (err) throw err;

    db.drop(function (err) {
        if (err) throw err;

        db.sync(function (err) {
            if (err) throw err;

            db.models.user.create({id: 1, username: 'jacob', password: 'hackthehack'}, function (err, user) {
                if (err) throw err;

                db.close();
                console.log("Done!");
            });
        });
    });
});