
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('favorites').del()
    .then(function () {
      // Inserts seed entries
      return knex('favorites').insert([
        {id: 1, symbol: 'MSFT', target: '+5', users_id: 1},
        {id: 2, symbol: 'AAAA', target: '+6', users_id: 2},
        {id: 3, symbol: 'BBBB', target: '+1', users_id: 3},
        {id: 4, symbol: 'CCCC', target: '+3', users_id: 1},
        {id: 5, symbol: 'DDDD', target: '+3', users_id: 2},
      ]);
    });
};
