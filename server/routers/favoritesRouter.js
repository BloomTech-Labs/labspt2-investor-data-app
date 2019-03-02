const express = require('express');
const router = express.Router();
const favorites = require('../data/helpers/favoritesModel')


/********* Get favorites *************/
router.get('/', async (req, res) => {
    await favorites.get()
        .then((stocks) => {
            res.json(stocks);
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: "The stock could not be retrieved." });
        });
});




module.exports = router;