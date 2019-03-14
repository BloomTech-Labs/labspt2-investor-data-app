const express = require("express");
const router = express.Router();
const stripe = require("./constants/stripe");
const billing = require("../data/helpers/billingModel");

// Send a response to the frontend
const postStripeCharge = res => (stripeErr, stripeRes) => {
  if (stripeErr) {
    res.status(500).send({ error: stripeErr });
  } else {
    res.status(200).send({ success: stripeRes });
  }
};

/************************************ BILLING SECTION ***********************************/

/********* Get Billing *************/
router.get("/", async (req, res) => {
  await billing
    .get()
    .then(bills => {
      res.json(bills);
    })
    .catch(err => {
      res.status(500).json({ error: "The billing could not be retrieved." });
    });
});

// Example POST request with Stripe
// TODO: Create actual POST request
// router.post("/", (req, res) => {
//   const body = {
//     source: req.body.token.id,
//     amount: req.body.amount,
//     currency: "usd"
//   };

//   stripe.charges.create(body, postStripeCharge(res));
// });

module.exports = router;
