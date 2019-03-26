const express = require("express");
const app = express();
const router = express.Router();
const stripe = require('../routers/constants/stripe');
app.set("view engine", "pug");
app.use(require("body-parser").urlencoded({extended: false}));

const postStripeCharge = res => (stripeErr, stripeRes) => {
  if (stripeErr) {
    res.status(500).send({ error: stripeErr });
  } else {
    res.status(200).send({ success: stripeRes });
  }
}

const paymentApi = app => {
  router.get('/', (req, res) => {
    res.send({ message: 'Hello Stripe checkout server!', timestamp: new Date().toISOString() })
  });

  router.post('/', (req, res) => {
    stripe.charges.create(req.body, postStripeCharge(res));
  });
 
  return app;
};

module.exports = paymentApi;