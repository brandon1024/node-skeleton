
exports.up = function(knex, Promise) {
    return knex.schema.alterTable('users', function(table) {
        table.string('email_secondary');
        table.string('first_name');
        table.string('last_name');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.alterTable('users', function(table) {
        table.dropColumn('email_secondary');
        table.dropColumn('first_name');
        table.dropColumn('last_name');
    });
};
