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
                        .json({ message: "The favorite with the specified ID does not exist." })
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
    const { uid } = req.params
    const newFavorite = req.body
    if (!newFavorite.symbol || !newFavorite.uid) {
        res
            .status(400)
            .json({ message: "Please provide symbol, target and users_id for the favorite." });
    } else {
       
        if (newFavorite) {
            favorites.update(uid, newFavorite)
                .then(favorite => {  
                        if (favorite) {
                            res
                                .status(201)
                                .json(favorite);
                        } else {
                            res
                                .status(404)
                                .json({ message: "The favorite with the specified ID does not exist." })
                        }    
                })
                .catch(err => {
                    res
                        .status(500)
                        .json({ error: "The favorite could not be modified." });
                });
        } else {
            res
                .status(404)
                .json({ message: "The favorite with the specified ID does not exist." })
        }
    }
})

/********* Create New Favorite *************/
router.post('/', (req, res) => {
    const favorite = req.body;
    if (favorite.symbol && favorite.uid) {
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
            .json({ message: "missing symbol, target and/or usersId." })
    }
});



module.exports = router;