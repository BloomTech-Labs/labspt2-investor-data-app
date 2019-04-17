const db = require('../dbConfig.js');

module.exports = {

    get: async function (uid) {
        let query = db('favorites');
        if (uid) {
            query.where('uid', uid).first();
            return query;
        }
        return db('favorites')
    },

    insert: function (favorite) {
        return db('favorites')
            .insert(favorite)
            .then((uid) => this.get(uid));
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

