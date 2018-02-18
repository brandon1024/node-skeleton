const bookshelf = require('../db/bookshelf');

module.exports = bookshelf.Model.extend({
    tableName: 'users',
    byUsername: function(username) {
        return this.findOne({username: username});
    },
    byEmail: function(email) {
        return this.findOne({email: email});
    },
    authenticate: function (password) {
        return this.get('password') === password;
    }
});