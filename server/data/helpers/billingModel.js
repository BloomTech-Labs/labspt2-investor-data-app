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
    let query = db('billing');
      query.where('usersId', acct)
      return query
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
