const Bookshelf = require('../db/bookshelf');

//require('./another_model'); //Uncomment if this model uses another (resolves circular dependencies)
const User =  Bookshelf.Model.extend({
    tableName: 'users',
    hasTimestamps: true
}, {
    findByUsername: function(username) {
        return this.query({where: {username: username}}).fetch();
    },
    findByEmail: function(email) {
        return this.query({where: {email: email}}).fetch();
    }
});

module.exports = Bookshelf.model('User', User);