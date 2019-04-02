const db = require("../dbConfig.js");

/* Removed Function turned it into arrow for ES6 */

module.exports = {
  get: () => {
    return db("users");
  },

  getById: uid => {
    let query = db("users");
    if (uid) {
      query.where("users.uid", uid).first();
      return query;
    }
    return db("users");
  },

  checkEmail: email => {
    return db("users").where('email', email)
  }, 
  insert: user => {
    return db("users")
      .insert(user)
      // .then(([id]) => this.get(id));
  },

  update: (id, changes) => {
    return db("users")
      .where("id", Number(id))
      .update(changes);
  },

  remove: id => {
    return db("users")
      .where("id", id)
      .del();
  },

  findByUsername: username => {
    return db("users")
      .where("username", username)
      .first();
  },

  findById: uid => {
    return db("users")
      .where("uid", uid)
      .first();
  },

  findUsers: () => {
    return db("users").select("id", "username");
  },

  find: () => {
    return db("users").select("id", "username");
  }
};
