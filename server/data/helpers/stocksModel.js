const db = require("../dbConfig.js");

module.exports = {
    get: () => {
        return db("stocks");
    },

   getByUid: uid => {
        let query = db('stocks');
        if (uid) {
            query.where('uid', uid).first();
            return query;
        }
        return db('stocks')
    },

    update: (uid, changes) => {
        return db('stocks')
            .where('uid', uid)
            .update(changes)
            .then(count => (count > 0 ? this.get(uid) : null));
    },

    remove: symbol => {
        return db('stocks')
            .where('symbol', symbol)
            .del();
    },

    insert: stock => {
        return db("stocks").insert(stock);
    }
};
