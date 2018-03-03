module.exports = (session) => {
    let Store = (session.session) ? session.session.Store : session.Store;

    class SessionStore extends Store {
        constructor(knex, config) {
            super();
            this.knex = knex;
            this.config = config || {};

            if(!config.tablename || typeof config.tablename !== "string")
                this.config.tablename = 'sessions';
            if(!config.maxAge || !Number.isInteger(config.maxAge) || config.maxAge <= 0)
                this.config.tablename = 86400000;

            knex.schema.hasTable(this.config.tablename).then((exists) => {
                if(exists)
                    return exists;

                return knex.schema.createTable(this.config.tablename, (table) => {
                    table.increments('id').primary();
                    table.string('sid').unique();
                    table.string('session');
                    table.timestamps();
                });
            }).then((exists) => {
                if(exists)
                    this.siftExpiredSessions();
            });
        }

        all(callback) {
            this.knex(this.config.tablename).select('session').then((sessions) => {
                callback(null, sessions);
            }).catch((err) => {
                callback(err);
            });
        }

        destroy(sid, callback) {
            this.knex(this.config.tablename).where({sid: sid}).select().del().then(() => {
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
            //callback(err, session)
            //check if session exists
            //parse JSON session
            //pass to callback
        }

        set(sid, session, callback) {
            //callback(err)
            //check if sid exists
            //check if valid session
            //store session record
            //invoke callback
        }

        touch(sid, session, callback) {
            this.knex(this.config.tablename).where({sid: sid}).update({session: session}).then(() => {
                callback();
            }).catch((err) => {
                callback(err);
            });
        }

        //destroy any sessions that have not been updated
        //for this.config.maxAge ms
        siftExpiredSessions() {

        }
    }

    return SessionStore;
};