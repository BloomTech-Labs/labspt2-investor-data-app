const express = require('express');
const router = express.Router();
const favorites = require('../data/helpers/favoritesModel')


/********* Get Favorites *************/
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


/********* Get Single Favorite *************/
router.get('/:uid', async (req, res) => {
    const { uid } = req.params
  await favorites.get(uid)
        .then(favorite => {
            if (favorite) {
                res.json(favorite);
            } else {
                res
                    .status(404)
                    .json({ message: "The favorite with the specified ID does not exist." })
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: "The favorite information could not be retrieved." });
        });
});


/************* Delete Favorite *************/
router.delete('/:uid', (req, res) => {
    const { uid } = req.params

    if (uid) {
        favorites.remove(uid)
            .then(favorite => {
                if (favorite) {
                    res.json({ message: "The favorite was successfully deleted" });
                } else {
                    res
                        .status(404)
                        .json({ message: "The favorite with the specified UID does not exist." })
                }
            })
            .catch(err => {
                res
                    .status(500)
                    .json({ error: "The favorite could not be removed." });
            });
    }
});

/********* Update Favorite *************/
router.put('/:uid', (req, res) => {
    const { uid } = req.params;
    const changes = req.body;
    favorites
        .update(uid, changes)
        .then(count => {
            if (count) {
                favorites.get(uid)
                    .then(user => {
                        // If user's favorites have been updated, return the updated user favorites.
                        res
                            .status(201)
                            .json(user);
                    })
                    .catch(err => {
                        // Return an error if there's an error retrieving that current favorites.
                        res
                            .status(500)
                            .json({ message: 'There was an error retrieving the current favorites.' });
                    })
            } else {
                // If user does not exist, return 404 error.
                res
                    .status(404)
                    .json({ message: 'The favorite with the specified user ID does not exist.' });
            };
        })
        .catch(err => {
            // If there's an error in the helper method or database, return a 500 error.
            res
                .status(500)
                .json({ message: `The user's favorites could not be updated at this time.` });
        });
});

/********* Create New Favorite *************/
router.post('/', (req, res) => {
    const favorite = req.body;
    if (favorite.symbol &&  favorite.uid) {
        favorites.insert(favorite)
            .then(favorite => {
                res.status(201)
                    .json(favorite)
            })
            .catch(err => {
                res
                    .status(500)
                    .json({ message: "failed to insert favorite in db" })
            });
    } else {
        res
            .status(400)
            .json({ message: "missing symbol and/or uid." })
    }
});



module.exports = router;