/* Definitions */
const knex = require('knex');
const bookshelf = require('bookshelf');
const debug = require('debug')('db-config');

/* TODO: Change Database Name to App Name */
var dbconfig = {
    client: 'mysql',
    connection: {
        host     : '127.0.0.1',
        user     : 'root',
        password : 'password',
        database : 'ceccompetition',
        charset  : 'utf8'
    },
    debug: false
};

module.exports = bookshelf(knex(dbconfig));