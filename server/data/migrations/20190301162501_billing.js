exports.up = function(knex, Promise) {
  return knex.schema.createTable("billing", billing => {
    billing.increments("id");
    billing.string("street", 255).notNullable();
    billing.string("city", 128).notNullable();
    billing.string("state", 128).notNullable();

    billing.string("country", 255).notNullable();
    billing.integer("zipcode").notNullable();
    billing.string("mailingStreet", 255).notNullable();
    billing.string("mailingCity", 128);
    billing.string("mailingState", 128);
    billing.string("mailingCountry", 255);
    billing.integer("mailingZipcode").notNullable();
    billing
      .string("ccn")
      .notNullable()
      .unsigned();
    billing
      .integer("expireMonth")
      .notNullable()
      .unsigned();
    billing
      .integer("expireYear")
      .notNullable()
      .unsigned();
    billing
      .integer("code")
      .notNullable()
      .unsigned();
    billing
      .integer("monthlyBill")
      .notNullable()
      .unsigned();
    billing.string("accountStatus", 128).notNullable();
    billing.integer("targetsUsed").unsigned();
    billing.integer("accountType").unsigned();
    billing.integer('users_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("billing");
};
