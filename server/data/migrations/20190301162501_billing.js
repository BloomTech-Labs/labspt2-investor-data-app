exports.up = function(knex, Promise) {
  return knex.schema.createTable('billing', billing => {
    billing.increments('id');
    billing.integer('accountType').unsigned();
    billing
      .string('usersId')
      .references('users.uid');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('billing');
};
