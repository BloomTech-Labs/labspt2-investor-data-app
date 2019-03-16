exports.up = function(knex, Promise) {
  return knex.schema.table("billing", billing => {
    billing.string("mobilePhone", 128);
    billing.string("homePhone", 128);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("billing", billing => {
    billing.removeColumn("mobilePhone");
    billing.removeColumn("homePhone");
  });
};
