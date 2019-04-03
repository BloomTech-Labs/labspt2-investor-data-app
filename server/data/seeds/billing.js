exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex ('billing').del ().then (function () {
    // Inserts seed entries
    return knex ('billing').insert ([
      {id: 1, accountType: 1, usersId: 504},
      {id: 2, accountType: 2, usersId: 503},
      {id: 3, accountType: 3, usersId: 500},
      {id: 4, accountType: 0, usersId: 499},
    ]);
  });
};
