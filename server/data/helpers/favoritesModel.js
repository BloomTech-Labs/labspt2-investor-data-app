const db = require('../dbConfig.js');

module.exports = {

    get: () => {
        return db("favorites");
      },
      
    getByUid: uid => {
        let query = db('favorites');
        if (uid) {
            query.where('uid', uid).first();
            return query;
        }
        return db('favorites')
    },

    insert: favorite => {
        return db('favorites')
            .insert(favorite)
            .then(([uid]) => this.get(uid));
    },

    update: (uid, changes) => {
        return db('favorites')
            .where('uid', uid)
            .update(changes)
            .then(count => (count > 0 ? this.get(uid) : null));
    },

    remove: symbol => {
        return db('favorites')
            .where('symbol', symbol)
            .del();
    }

};

