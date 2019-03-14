exports.up = function(knex, Promise) {
  return knex.schema.createTable("favorites", favorites => {
    favorites.increments();
    favorites.string("symbol", 128).notNullable();
    favorites
      .integer("target")
      .unsigned()
      .notNullable();
    favorites.integer("users_id").unsigned();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("favorites");
};
