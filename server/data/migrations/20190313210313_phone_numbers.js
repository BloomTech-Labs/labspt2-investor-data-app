exports.up = function(knex, Promise) {
  return knex.schema.createTable("billing", billing => {
    billing.integer("mobilePhone").notNullable();
    billing.integer("homePhone");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("billing");
};
