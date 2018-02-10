var models = require('../models');

models(function (err, db) {
    if (err) throw err;

    db.drop(function (err) {
        if (err) throw err;

        db.sync(function (err) {
            if (err) throw err;

            db.models.user.create({id: 1, username: 'jacob', password: 'hackthehack'}, function (err, user) {
                if(err) throw err;

                db.close();
                console.log("Done!");
            });
            //db.models.user.create({id: 2, username: 'amir', password: 'hackthehack'});
            //db.models.user.create({id: 3, username: 'brandon', password: 'hackthehack'});
            //db.models.user.create({id: 4, username: 'alex', password: 'hackthehack'});



            /*db.models.user.find({}, function (err, users) {
                if(err) throw err;

                db.models.message.create({
                    title: "Hello world", body: "Testing testing 1 2 3"
                }, function (err, message) {
                    if (err) throw err;

                    db.close();
                    console.log("Done!");
                });

                db.models.channel.create({
                    users: user
                });
            });*/
        });
    });
});