
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('stocks').del()
    .then(function () {
      // Inserts seed entries
      return knex('stocks').insert([
        {id: 1, symbol: 'MSFT', sharesCost: 5000.00, shareCost: 50.00, sharePurch: 100, uid: '5XVDcbsvwka_bnC', datePurch: '01/10/2019'},
        {id: 2, symbol: 'AAPL', sharesCost: 2000.00, shareCost: 100.00, sharePurch: 20, uid: 'luY3BUF5OpoaYiM', datePurch: '02/20/2019'},
        {id: 3, symbol: 'ACE', sharesCost: 1000.00, shareCost: 10.00, sharePurch: 100, uid: '8ar9mNLYHaslfyj', datePurch: '03/05/2019'}     
      ]);
    });
};
