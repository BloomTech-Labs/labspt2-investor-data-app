const db = require("../dbConfig.js");

/* Removed Function turned it into arrow for ES6 */

module.exports = {
  get: () => {
    return db("users");
  },

  getById: id => {
    let query = db("users");
    if (id) {
      query.where("id", id).first();
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
