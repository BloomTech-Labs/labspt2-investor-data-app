
exports.up = function(knex, Promise) {
    return knex.schema.table('users', users => {
        users.string("phoneNumber");
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('users', users => {
        users.dropColumn("phoneNumber");
    });
};
