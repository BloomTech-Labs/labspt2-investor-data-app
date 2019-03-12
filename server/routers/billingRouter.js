const express = require('express');
const router = express.Router();
const billing = require('../data/helpers/billingModel')



/************************************ BILLING SECTION ***********************************/

/********* Get Billing *************/
router.get('/', async (req, res) => {
  await  billing.get()
        .then((bills) => {
            res.json(bills);
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: "The billing could not be retrieved." });
        });
});

/********* Get Single Billing Record *************/
router.get('/:id', async (req, res) => {
    const { id } = req.params
  await billing.get(id)
        .then(bills => {
            if (bills) {
                res.json(bills);
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



module.exports = router;