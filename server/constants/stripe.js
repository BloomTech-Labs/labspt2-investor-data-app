const configureStripe = require('stripe');

const STRIPE_SECRET_KEY = process.env.NODE_ENV === 'production'
    ? 'sk_test_Sg9N7vSkBtUmw8h3Kh1TW5iV00No25ABcp'
    : 'sk_test_Sg9N7vSkBtUmw8h3Kh1TW5iV00No25ABcp';

const stripe = configureStripe(STRIPE_SECRET_KEY);

module.exports = stripe;