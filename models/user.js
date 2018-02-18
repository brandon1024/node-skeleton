var Base = require('./base');
var Book = require('./book');



module.exports = Base.extend({
    tableName: 'users',
    books: function () {
        this.hasMany(Book)
    },
    authenticate: function (password) {
        return this.get('password') === password;
    }
}, {
    byUsername: function(username) {
        return this.findOne({ username: username });
    }
});
