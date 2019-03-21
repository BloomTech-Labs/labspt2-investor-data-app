import React from 'react'
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import PAYMENT_SERVER_URL from '../../constants/payment_server';
//import STRIPE_PUBLISHABLE from '../../constants/publisher_key';

const STRIPE_PUBLISHABLE = 'pk_test_7mDiIF0ntVgLJjKz6B7evL0i00J88bDjzD';

const CURRENCY = 'USD';

const fromUSDToCent = amount => amount * 100;

const successPayment = data => {
  alert('Payment Successful');
};

const errorPayment = data => {
  alert('Payment Error');
};

const onToken = (amount) => token =>
  axios.post(PAYMENT_SERVER_URL,
    {
      source: token.id,
      currency: CURRENCY,
      amount: fromUSDToCent(amount)
    })
    .then(successPayment)
    .catch(errorPayment);

const Checkout = ({ name, amount }) =>
  <StripeCheckout
    name={name}
    amount={fromUSDToCent(amount)}
    token={onToken(amount)}
    currency={CURRENCY}
    stripeKey={STRIPE_PUBLISHABLE}
  />

export default Checkout;