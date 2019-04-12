exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('billing')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('billing').insert([
        {id: 1, accountType: 1},
        {id: 2, accountType: 2},
        {id: 3, accountType: 3},
        {id: 4, accountType: 1},
      ]);
    });
};
