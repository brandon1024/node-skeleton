exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', function(table) {
        table.increments('id').primary();
        table.string('username').unique();
        table.string('email').unique();
        table.string('password');
        table.string('role').defaultTo('user');
        table.boolean('email_validated').defaultTo(false);
        table.timestamps();
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
};
