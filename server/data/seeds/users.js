
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      for (let i = 0; i < 5; i++) {

      }
      
      return knex('users').insert([
        {id: 1, firstName: 'John', lastName: 'Doe', email: 'test@here.com', password: '12345' },
        {id: 2, firstName: 'Betty', lastName: 'Rubble', email: 'test2@here.com', password: '12345' },
        {id: 3, firstName: 'Barney', lastName: 'Rubble', email: 'test3@here.com', password: '6789' },
      ]);
    });
};
