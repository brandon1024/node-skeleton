const knex = require('knex');
const bookshelf = require('bookshelf');
const config = require('./config');

module.exports = bookshelf(knex(config.db));