module.exports = (session) => {
    let Store = (session.session) ? session.session.Store : session.Store;

    class SessionStore extends Store {
        constructor(knex, config) {
            super();
            this.knex = knex;
            this.config = config || {};

            if(!this.config.tablename || typeof this.config.tablename !== "string")
                this.config.tablename = 'sessions';
            if(!this.config.maxAge || !Number.isInteger(this.config.maxAge) || this.config.maxAge <= 0)
                this.config.maxAge = 86400000;

            this.knex.schema.hasTable(this.config.tablename).then((exists) => {
                if(!exists)
                    throw new Error('No table exists with the name \'' + this.config.tablename + '\'. Consider running migrations.');

                this.siftExpiredSessions();
            });
        }

        destroy(sid, callback) {
            if(!sid)
                return callback();

            this.knex(this.config.tablename).where({sid: sid}).del().then(() => {
                callback();
            }).catch((err) => {
                callback(err);
            });
        }

        clear(callback) {
            this.knex(this.config.tablename).del().then(() => {
                callback();
            }).catch((err) => {
                callback(err);
            });
        }

        length(callback) {
            this.knex(this.config.tablename).count('sid').then((count) => {
                callback(null, count);
            }).catch((err) => {
                callback(err);
            });
        }

        get(sid, callback) {
            if(!sid)
                return callback();

            this.knex(this.config.tablename).where({sid: sid}).select().then((session) => {
                session = session[0];
                if(!session)
                    return callback();

                let expiryDate = new Date(Date.now() - this.config.maxAge);
                let sessionUpdated = new Date(session.updated_at);
                if(sessionUpdated < expiryDate)
                    return callback();

                return callback(null, JSON.parse(session.session));
            }).catch((err) => {
                callback(err);
            });
        }

        set(sid, session, callback) {
            if(!sid)
                return callback();
            if(!session || typeof session !== 'object')
                return callback();

            let sessionString = JSON.stringify(session);
            let query = 'INSERT INTO ' + this.config.tablename + ' (sid, session) VALUES (?, ?) ON DUPLICATE KEY UPDATE session = ?';

            this.knex.raw(query, [sid, sessionString, sessionString]).then((resp) => {
                callback();
            }).catch((err) => {
                callback(err);
            });
        }

        touch(sid, session, callback) {
            console.log('touched! :D');
            if(!sid)
                return callback();
            if(!session || typeof session !== 'object')
                return callback();

            this.knex(this.config.tablename).where({sid: sid}).update({session: session, updated_at: this.knex.fn.now()}).then(() => {
                callback();
            }).catch((err) => {
                callback(err);
            });
        }

        //destroy any sessions that have not been updated
        //for this.config.maxAge ms
        siftExpiredSessions() {
            let expiryDate = new Date(Date.now() - this.config.maxAge);
            let formattedExpiryDate = expiryDate.toISOString().replace(/T/, ' ').replace(/Z/, '').replace(/\.\d*$/, '');
            this.knex(this.config.tablename).where('updated_at', '<', formattedExpiryDate).del();
        };
    }

    return SessionStore;
};