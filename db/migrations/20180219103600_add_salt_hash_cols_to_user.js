
exports.up = function(knex, Promise) {
    return knex.schema.alterTable('users', function(table) {
        table.string('salt');
        table.renameColumn('password', 'hash');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.alterTable('users', function(table) {
        table.dropColumn('salt');
        table.renameColumn('hash', 'password');
    });
};
