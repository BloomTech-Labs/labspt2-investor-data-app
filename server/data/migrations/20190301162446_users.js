exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", users => {
    users.increments();
    users.string("firstName", 128).notNullable();
    users.string("lastName", 128).notNullable();
    users
      .string("email", 128)
      .notNullable()
      .unique();
    users
      .string("uid", 128)
      .notNullable()
      .unique();
    users.boolean("receiveEmails").defaultTo(false);
    users.boolean("receiveTexts").defaultTo(false);
    users.integer('balance');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
