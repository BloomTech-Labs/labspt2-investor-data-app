const db = require("../dbConfig.js");

module.exports = {
  get: function() {
    return db("billing");
  },

  getAcct: uid => {
    return db("billing")
      .where("usersId", uid)
      .first();
  },

  insert: function(bills) {
    return db("billing").insert(bills);
  },

  update: function(id, changes) {
    return db("billing")
      .where("id", id)
      .update(changes)
      .then(count => (count > 0 ? this.get(id) : null));
  },

  remove: function(id) {
    return db("billing")
      .where("id", id)
      .del();
  }
};
