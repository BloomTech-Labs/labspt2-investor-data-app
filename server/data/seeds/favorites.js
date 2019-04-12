
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('favorites').del()
    .then(function () {
      // Inserts seed entries
      return knex('favorites').insert([
        {id: 1, symbol: 'MSFT'},
        {id: 2, symbol: 'AAPL'},
        {id: 3, symbol: 'MSFT'},
        {id: 4, symbol: 'AAPL'},
        {id: 5, symbol: 'AAPL'},
      ]);
    });
};
