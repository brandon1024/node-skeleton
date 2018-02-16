/* Definitions */
const orm      = require('orm');
const settings = require('../settings');
const user = require('./user');
const debug = require('debug')('model-config');
var connection = null;

function setup(db, cb) {
    user(orm, db);

    return cb(null, db);
}

module.exports = function (cb) {
    if (connection)
        return cb(null, connection);

    orm.connect(settings.database, function (err, db) {
        if (err)
            return cb(err);

        connection = db;
        db.settings.set('instance.returnAllErrors', true);
        setup(db, cb);
    });
};