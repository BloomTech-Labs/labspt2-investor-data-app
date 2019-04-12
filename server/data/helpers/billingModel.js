const db = require('../dbConfig.js');

module.exports = {
  get: function() {
    return db('billing');
  },

  get: function(uid) {
    let query = db('billing');
    if (uid) {
      query.where('billing.uid', uid).first();
      return query;
    }
    return db('billing');
  },

  insert: function(bills) {
    return db('billing').insert(bills);
  },

  update: function(uid, changes) {
    return db('billing')
      .where('uid', uid)
      .update(changes)
      .then(count => (count > 0 ? this.get(uid) : null));
  },

  remove: function(uid) {
    return db('billing')
      .where('uid', uid)
      .del();
  },
};
