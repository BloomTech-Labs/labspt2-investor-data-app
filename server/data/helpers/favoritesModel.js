const db = require('../dbConfig.js');

module.exports = {


    get: function (users_id) {
        let query = db('favorites');
        if (users_id) {
           return query.where('users_id', users_id)  
        }
        return db('favorites')
    },

    insert: function (favorite) {
        return db('favorites')
            .insert(favorite)
            .then((id) => this.get(id));
    },

    update: function (id, changes) {
        return db('favorites')
            .where('id', id)
            .update(changes)
            .then(count => (count > 0 ? this.get(id) : null));
    },

    remove: function (symbol) {
        return db('favorites')
            .where('symbol', symbol)
            .del();
    }

};

