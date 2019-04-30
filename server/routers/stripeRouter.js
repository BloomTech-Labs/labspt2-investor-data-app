const express = require ('express');
const router = express.Router ();
const stripe = require ('../constants/stripe');

router.post ('/', (req, res) => {
  try {
  stripe.customers.create ({
    source: req.body.source,
    email: req.body.email,
  });
  
  res.json({status});
 } catch (err) {
    res.status(500).end();
  }
   stripe.subscriptions.create ({
   customer: customer.id,
   plan: req.body.plan
  }); 
},)
module.exports = router;
