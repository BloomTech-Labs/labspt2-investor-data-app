const db = require('../dbConfig.js');

module.exports = {
  get: function() {
    return db('billing');
  },

  get: function(id) {
    let query = db('billing');
    if (id) {
      query.where('billing.id', id).first();
      return query;
    }
    return db('billing');
  },

  checkAcctType: function(acct) {
    return db('billing')
          .join('users', 'billing.usersId', 'users.uid')
          .where('accountType', acct)
  },

  insert: function(bills) {
    return db('billing').insert(bills);
  },

  update: function(id, changes) {
    return db('billing')
      .where('id', id)
      .update(changes)
      .then(count => (count > 0 ? this.get(id) : null));
  },

  remove: function(id) {
    return db('billing')
      .where('id', id)
      .del();
  },
};
