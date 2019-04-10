exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('billing')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('billing').insert([
        {id: 1, accountType: 1, usersId: '5XVDcbsvwka_bnC'},
        {id: 2, accountType: 2, usersId: 'luY3BUF5OpoaYiM'},
        {id: 3, accountType: 3, usersId: '8ar9mNLYHaslfyj'},
        {id: 4, accountType: 1, usersId: 'R8xKCmhr89UuOM_'},
      ]);
    });
};
