/* TODO: Change Database Name to App Name */
module.exports = {
    development: {
        client: 'mysql',
        connection: {
            host     : '127.0.0.1',
            user     : 'root',
            password : 'password',
            database : 'ceccompetitiondev',
            charset  : 'utf8'
        },
        debug: false,
        migrations: {
            directory: './migrations',
            tableName: 'knex_migrations'
        },
        seeds: {
            directory: './seeds/dev'
        }
    },
    test: {
        client: 'mysql',
            connection: {
            host     : '127.0.0.1',
                user     : 'root',
                password : 'password',
                database : 'ceccompetitiontest',
                charset  : 'utf8'
        },
        debug: false,
        migrations: {
            directory: './migrations',
            tableName: 'knex_migrations'
        },
        seeds: {
            directory: './seeds/test'
        }
    },
    production: {
        client: 'mysql',
        connection: {
            host     : '127.0.0.1',
            user     : 'root',
            password : 'password',
            database : 'ceccompetitionprod',
            charset  : 'utf8'
        },
        debug: false,
        migrations: {
            directory: './migrations',
            tableName: 'knex_migrations'
        },
        seeds: {
            directory: './seeds/prod'
        }
    }
};