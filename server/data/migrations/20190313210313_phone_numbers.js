 exports.up = function(knex, Promise) {
  return knex.schema.table("billing", billing => {
    //moved these to the billing migration file because of error below
    //this entire file should probably be removed.
    //billing.string("mobilePhone", 128);
   // billing.string("homePhone", 128);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("billing", billing => {
    //commented these out because of error message: removeColumn is not a function
    //when i attempted to do a rollback.
  //  billing.removeColumn("mobilePhone");
  //  billing.removeColumn("homePhone");
  });
};
