const db = require("../dbConfig.js");

module.exports = {
  get: () => {
    return db("users");
  },

  getById: uid => {
    let query = db("users");
    if (uid) {
      query.where("uid", uid).first();
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
   },

  update: (uid, changes) => {
    return db("users")
      .where("uid", uid)
      .update(changes);
  },

  remove: uid => {
    return db("users")
      .where("uid", uid)
      .del();
  },

 // findByUsername: username => {
 //   return db("users")
 //     .where("username", username)
 //     .first();
//  },

  findById: uid => {
    return db("users")
      .where("uid", uid)
      .first();
  },

//  findUsers: () => {
 //   return db("users").select("id", "username");
//  },

 // find: () => {
 //   return db("users").select("id", "username");
//  }
};
