const db = require('../dbConfig.js');

module.exports = {


    get: function () {
        return db('billing')
    },

    get: function (id) {
        let query = db('billing');
        if (id) {
            query.where('billing.id', id).first();
            return query;
        }
        return db('billing')
    },

    insert: async function (list) {
        return db('billing')
            .insert(list)
            .then(([id]) => this.get(id));
    },

    update: function (id, changes) {
        return db('billing')
            .where('id', id)
            .update(changes)
            .then(count => (count > 0 ? this.get(id) : null));
    },

    remove: function (id) {
        return db('billing')
            .where('id', id)
            .del();
    },
};

