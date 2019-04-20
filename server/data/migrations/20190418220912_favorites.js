
exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.createTable('favorite', (favorites) => {
        favorites.increments();
        favorites.string('symbol', 128).notNullable();
        favorites
          .integer('user_id')
          .unique()
          .unsigned()
          .references('users.id')
      })
    ])
  };
  
  
  exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('favorite')
  };