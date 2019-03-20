const configureStripe = require('stripe');

const STRIPE_SECRET_KEY =
  process.env.NODE_ENV === 'production'
    ? process.env.STRIPE_LIVE_KEY
    : process.env.STRIPE_TEST_KEY;

const stripe = configureStripe(STRIPE_SECRET_KEY);

module.exports = stripe;