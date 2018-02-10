module.exports = function (orm, db) {
    var Channel = db.define('channel', {
            name: { type: 'text', required: true },
            createdAt: { type: 'date', required: true, time: true }
    });

    Channel.hasMany('user', db.models.user, { required: true, reverse: 'channels', autoFetch: true });
    Channel.hasMany('messages', db.models.message, { required: true, reverse: 'messages', autoFetch: true });
};