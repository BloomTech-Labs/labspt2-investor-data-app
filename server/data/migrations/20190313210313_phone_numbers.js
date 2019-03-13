exports.up = function(knex, Promise) {
  return knex.schema.table("billing", billing => {
    billing.integer("mobilePhone");
    billing.integer("homePhone");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("billing", billing => {
    billing.removeColumn("mobilePhone");
    billing.removeColumn("homePhone");
  });
};
