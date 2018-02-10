module.exports = function (orm, db) {
    var Channel = db.define('channel', {
            name: { type: 'text', required: true },
            createdAt: { type: 'date', required: true, time: true }
    });

    Channel.hasMany('users', db.models.user, {}, { reverse: 'channels', autoFetch: true });
    Channel.hasMany('messages', db.models.message, {}, { reverse: 'messages', autoFetch: true });
};