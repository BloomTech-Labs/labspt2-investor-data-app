const db = require('../dbConfig.js');

module.exports = {

    get: async function (uid) {
        let query = db('favorites');
        if (uid) {
            query.where('favorites.uid', uid).first();
            return query;
        }
        return db('favorites')
    },

    insert: function (favorite) {
        return db('favorites')
            .insert(favorite)
            .then(([uid]) => this.get(uid));
    },

    update: function (uid, changes) {
        return db('favorites')
            .where('uid', uid)
            .update(changes)
            .then(count => (count > 0 ? this.get(uid) : null));
    },

    remove: function (uid) {
        return db('favorites')
            .where('uid', uid)
            .del();
    }

};

