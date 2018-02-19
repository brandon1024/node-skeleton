/* Bookshelf Configuration */
const debug = require('debug')('db-config');
const knexFile = require('./knexfile');

/* Determine DB Environment */
let env = process.env.NODE_ENV || 'development';
if(!['development', 'test', 'production'].includes(env))
    throw new Error(`Invalid Node Environment; NODE_ENV environment variable must be one of development, test, or production: ${env}`);

debug(`Using environment %s`, env);

let knexConfig = knexFile[env];
debug('Database Configuration: %O', knexConfig);

const knex = require('knex')(knexConfig);
const bookshelf = require('bookshelf')(knex);

/* Resolve Circular Dependencies with Relations */
bookshelf.plugin('registry');

module.exports = bookshelf;