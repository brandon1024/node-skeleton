
exports.up = function(knex, Promise) {
    return knex.schema.table('users', function(table) {
        table.datetime('created_at');
        table.datetime('updated_at');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('users', function(table) {
        table.dropColumn('created_at');
        table.dropColumn('updated_at');
    });
};
