/* Bookshelf Configuration */
const debug = require('debug')('db-config');
const knexFile = require('./knexfile.js');

/* Determine DB Environment */
let knexConfig = knexFile.development;
if(process.env.NODE_ENV === 'production')
    knexConfig = knexFile.production;
else if(process.env.NODE_ENV === 'test')
    knexConfig = knexFile.test;

debug(`Using environment ${process.env.NODE_ENV}`);
debug(`Database Configuration: ${knexConfig}`);

const knex = require('knex')(knexConfig);
const bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;