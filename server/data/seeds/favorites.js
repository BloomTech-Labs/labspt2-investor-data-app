
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('favorites').del()
    .then(function () {
      // Inserts seed entries
      return knex('favorites').insert([
        {id: 1, symbol: 'MSFT'},
        {id: 2, symbol: 'AAAA'},
        {id: 3, symbol: 'BBBB'},
        {id: 4, symbol: 'CCCC'},
        {id: 5, symbol: 'DDDD'},
      ]);
    });
};
