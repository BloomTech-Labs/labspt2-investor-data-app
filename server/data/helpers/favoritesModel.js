const db = require('../dbConfig.js');

module.exports = {


    get: async function () {
        return db('favorites')
    },

    get: async function (id) {
        let query =  db('favorites');
        if (id) {
         query.where('favorites.id', id).first();
            return query;
        }
        return db('favorites')
    },
 
    insert: function (note) {
        return db('favorites')
            .insert(note)
            .then(([id]) => this.get(id));
    },

    update: function (id, changes) {
        return db('favorites')
            .where('id', id)
            .update(changes)
            .then(count => (count > 0 ? this.get(id) : null));
    },

    remove: function (id) {
        return db('favorites')
            .where('id', id)
            .del();
    }

};
  
