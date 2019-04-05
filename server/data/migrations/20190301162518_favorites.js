exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('favorites', (favorites) => {
      favorites.increments();
      favorites.string('symbol', 128).notNullable();
      favorites
        .integer("target")
        .unsigned()
        .notNullable();
      favorites
        .integer('users_id')
        .unsigned()
        .references('users.id');
    })
  ])
};


exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('favorites')
  ]);
};

