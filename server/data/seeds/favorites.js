
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('favorites').del()
    .then(function () {
      // Inserts seed entries
      return knex('favorites').insert([
        {id: 1, symbol: 'MSFT', target: '+5'},
        {id: 2, symbol: 'AAAA', target: '+6'},
        {id: 3, symbol: 'BBBB', target: '+1'},
        {id: 4, symbol: 'CCCC', target: '+3'},
        {id: 5, symbol: 'DDDD', target: '+3'},
      ]);
    });
};
