const bookshelf = require('../db/bookshelf');

module.exports = bookshelf.Model.extend({
    hasTimestamps: true
}, {
    findAll: function(filter, options) {
        if(filter)
            return this.forge().where(filter).fetchAll(options);

        return this.forge().fetchAll(options);
    },
    findOne: function(query, options) {
        return this.forge(query).fetch(options);
    },
    create: function(data, options) {
        return this.forge(data).save(null, options);
    }
});