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
            },
            validations: {
                body   : orm.enforce.ranges.length(1, 1024)
            }
        });

    Message.hasOne('user', db.models.user, { required: true, reverse: 'messages', autoFetch: true });
    Message.hasOne('user', db.models.channel, { required: true, reverse: 'messages', autoFetch: true });
};