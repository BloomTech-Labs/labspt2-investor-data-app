const db = require("../dbConfig.js");

module.exports = {
    get: () => {
        return db("stocks");
    },

    getById: id =>{
        return db('stocks')
               .where('id', id)
               .first()
       },
   
    update: (id, changes) => {
        return db('stocks')
            .where('id', id)
            .update(changes);       
    },

    remove: id => {
        return db("stocks")
          .where("id", id)
          .del();
      },
    
      insert: stock => {
        return db("stocks").insert(stock);
    }
};
