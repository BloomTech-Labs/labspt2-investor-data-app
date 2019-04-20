
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('favorites').del()
    .then(function () {
      // Inserts seed entries
      return knex('favorites').insert([
        {id: 1, symbol: 'MSFT', user_id: 1},
        {id: 2, symbol: 'AAAA', user_id: 2},
        {id: 3, symbol: 'BBBB', user_id: 3},
        {id: 4, symbol: 'CCCC', user_id: 4},
        {id: 5, symbol: 'DDDD', user_id: 5},
      ]);
    });
};
