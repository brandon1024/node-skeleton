/* Bookshelf Configuration */
const debug = require('debug')('db-config');
const knexFile = require('./knexfile');

/* Determine DB Environment */
let env = process.env.NODE_ENV || 'development';
if(!['development', 'test', 'production'].includes(env)) {
    debug('Invalid NODE_ENV environment variable specified: %s. Defaulting to development environment.', env);
    env = 'development';
}

debug('Using environment %s', env);

let knexConfig = knexFile[env];
debug('Database Configuration: %O', knexConfig);

const knex = require('knex')(knexConfig);
const bookshelf = require('bookshelf')(knex);

/* Resolve Circular Dependencies with Relations */
bookshelf.plugin('registry');

module.exports = bookshelf;