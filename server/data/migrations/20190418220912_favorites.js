
exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.createTable('favorites', (favorites) => {
        favorites.increments();
        favorites.string('symbol', 128).notNullable();
        favorites
          .integer('users_id')
          .unique()
          .unsigned()
          .references('users.id')
      })
    ])
  };
  
  
  exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('favorite')
  };