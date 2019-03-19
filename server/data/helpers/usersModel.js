const db = require("../dbConfig.js");

/* Removed Function turned it into arrow for ES6 */

module.exports = {
  get: () => {
    return db("users");
  },

  getById: id => {
    let query = db("users");
    if (id) {
      query.where("users.id", id).first();
      return query;
    }
    return db("users");
  },

  getByUser: username => {
    return db("users")
      .where("username", username)
      .first();
  },

  insert: user => {
    return db("users")
      .insert(user)
      .then(([id]) => this.get(id));
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

  findByUsername: (username) => {
    return db("users")
      .where("username", username)
      .first();
  },

  findById: id => {
    return db("users")
      .where("id", id)
      .first();
  },

  findUsers: () => {
    return db("users").select("id", "username");
  },

  find: () => {
    return db("users").select("id", "username");
  }
};

