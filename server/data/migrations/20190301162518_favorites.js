
exports.up = function (knex, Promise) {
    return knex.schema.createTable('favorites', favorites => {
        favorites
            .increments();
        favorites
            .string('symbol', 128)
            .notNullable();
        favorites
            .integer('target')
            .unsigned()
            .notNullable();
        favorites
            .integer('users_id')
            .unsigned();
        favorites
            .foreign('users_id')
            .references('id')
            .on('users');
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('favorites');
};