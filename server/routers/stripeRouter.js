const express = require ('express');
const router = express.Router ();
const stripe = require ('../constants/stripe');


/*const postStripeCharge = res => (stripeErr, stripeRes) => {
  if (stripeErr) {
    res.status (500).send ({error: stripeErr});
  } else {
    res.status (200).send ({success: stripeRes});
  }
};

router.get ('/', (req, res) => {
  res.send ({
    message: 'Hello Stripe checkout server!',
    timestamp: new Date ().toISOString (),
  });
});
*/
router.post ('/', (req, res) => {
  stripe.customers.create ({
    source: req.body.source,
    email: req.body.email,
  },
  
  function(err, customer
    ) {
    if (err) {
      res.send({
        success: false,
        message: "Error"
      });
    } else { 
      
 //     id = customer.id;
      res.send ({
        success: true,
        message: "Success",
      }) 
    } 
    stripe.subscriptions.create ({
   customer: customer.id,
   plan: req.body.plan
  }); 
})
});

module.exports = router;
