
exports.up = function(knex, Promise) {
    return knex.schema.createTable('sessions', function(table) {
        table.increments('id').primary();
        table.string('sid').unique();
        table.string('session');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('sessions');
};
