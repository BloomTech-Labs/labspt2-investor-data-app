exports.up = function (knex, Promise) {
  return knex.schema.createTable ('billing', billing => {
    billing.increments ('id');
    billing.integer ('accountType').unsigned ();
    billing.integer ('usersId').unsigned ().references ('users.id');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists ('billing');
};
