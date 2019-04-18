
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('favorites').del()
    .then(function () {
      // Inserts seed entries
      return knex('favorites').insert([
        {id: 1, symbol: 'MSFT', uid: 'xHgfakdKhnageK'},
        {id: 2, symbol: 'AAAA', uid: 'yneoKndKaeIggH'},
        {id: 3, symbol: 'BBBB', uid: 'xHYoeIhgKnKaeH'},
        {id: 4, symbol: 'CCCC', uid: 'PeKaKheiHgxNgL'},
        {id: 5, symbol: 'DDDD', uid: 'XedINdLhaEkLhG'},
      ]);
    });
};
