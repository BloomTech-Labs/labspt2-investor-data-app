
exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.createTable('stocks', (stocks) => {
            stocks.increments();
            stocks.string('symbol', 128).notNullable();
            stocks.decimal('balance').scale();
            stocks.decimal('sharesPrice').scale();
            stocks.integer('sharesPurch').unsigned();
            stocks
                .string('uid')
                .references('users.uid');
            stocks.date('datePurch').notNullable();

        })
    ])
};


exports.down = function (knex, Promise) {
    return Promise.all([
        knex.schema.dropTableIfExists('stocks')
    ]);
};

