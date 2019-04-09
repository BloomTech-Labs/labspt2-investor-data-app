const express = require("express");
const router = express.Router();
const stripe = require("../constants/stripe");

const postStripeCharge = res => (stripeErr, stripeRes) => {
  if (stripeErr) {
    res.status(500).send({ error: stripeErr });
  } else {
    res.status(200).send({ success: stripeRes });
  }
}

router.get('/', (req, res) => {
  res.send({ message: 'Hello Stripe checkout server!', timestamp: new Date().toISOString() })
});

router.post('/', (req, res) => {
  stripe.charges.create(req.body, postStripeCharge(res));
  console.log(req.body);
});

module.exports = router;
