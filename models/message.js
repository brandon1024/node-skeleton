module.exports = function (orm, db) {
    var Message = db.define('message', {
            body: { type: 'text', required: true },
            createdAt: { type: 'date', required: true, time: true }
        },
        {
            hooks: {
                beforeValidation: function () {
                    this.createdAt = new Date();
                }
            }
        });

    Message.hasOne('user', db.models.user, { required: true, reverse: 'messages', autoFetch: true });
    Message.hasOne('channel', db.models.channel, { required: true, reverse: 'messages', autoFetch: true });
};