const express = require('express');
const router = express.Router();
const stocks = require('../data/helpers/stocksModel')


/********* Get stocks *************/
router.get('/', (req, res) => {
    stocks.get()
        .then((stocks) => {
            res.json(stocks);
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: "The stock could not be retrieved." });
        });
});


/********* Get Single stock *************/
router.get('/:uid', async (req, res) => {
    const { uid } = req.params
  await stocks.getByUid(uid)
        .then(stock => {
            if (stock) {
                res.json(stock);
            } else {
                res
                    .status(404)
                    .json({ message: "The stock with the specified ID does not exist." })
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: "The stock information could not be retrieved." });
        });
});


/************* Delete stock *************/
router.delete('/:id', (req, res) => {
    const {id} = req.params
    if (id){
        stocks.remove(id)
            .then(stock => {
                if (stock) {
                    res.json({ message: "The stock was successfully deleted" });
                } else {
                    res
                        .status(404)
                        .json({ message: "The stock with the specified UID does not exist." })
                }
            })
            .catch(err => {
                res
                    .status(500)
                    .json({ error: "The stock could not be removed." });
            });
    }
});

/********* Update stock *************/
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    stocks
        .update(id, changes)
        .then(count => {
            if (count) {
                stocks.getById(id)
                    .then(user => {
                        // If user's stocks have been updated, return the updated user stocks.
                        res
                            .status(201)
                            .json(user);
                    })
                    .catch(err => {
                        // Return an error if there's an error retrieving that current stocks.
                        res
                            .status(500)
                            .json({ message: 'There was an error retrieving the current stocks.' });
                    })
            } else {
                // If user does not exist, return 404 error.
                res
                    .status(404)
                    .json({ message: 'The stock with the specified user ID does not exist.' });
            };
        })
        .catch(err => {
            // If there's an error in the helper method or database, return a 500 error.
            res
                .status(500)
                .json({ message: `The user's stocks could not be updated at this time.` });
        });
});

/********* Create New stock *************/
router.post('/', (req, res) => {
    const stock = req.body;
    stocks
    .insert(stock)
    .then(stock => {
      res.status(201).json(stock);
    })
    .catch(err => {
      res.status(500).json({message: 'failed to insert stock in db'});
    });
});



module.exports = router;