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



module.exports = router;