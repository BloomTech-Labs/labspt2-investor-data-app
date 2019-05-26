
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('stocks').del()
    .then(function () {
      // Inserts seed entries
      return knex('stocks').insert([
        {id: 1, symbol: 'MSFT', balance: 20000.00, sharesPrice: 0.00, sharesPurch: 0, uid: '5XVDcbsvwka_bnC', datePurch: '01/10/2019'},
        {id: 2, symbol: 'AAPL', balance: 18000.00, sharesPrice: 100.00, sharesPurch: 20, uid: 'luY3BUF5OpoaYiM',  datePurch: '02/20/2019'},
        {id: 3, symbol: 'ACE', balance: 19000.00, sharesPrice: 10.00, sharesPurch: 100, uid: '8ar9mNLYHaslfyj',  datePurch: '03/05/2019'}     
      ]);
    });
};
