module.exports = function (orm, db) {
    var User = db.define('user', {
            username: { type: 'text', required: true },
            password: { type: 'text', required: true }
    });
};