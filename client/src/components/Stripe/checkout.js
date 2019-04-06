import React, {Component} from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import STRIPE_PUBLISHABLE from '../../constants/stripe';
import PAYMENT_SERVER_URL from '../../constants/server';
import {fire} from '../Auth/firebaseConfig';

const CURRENCY = 'USD';

const fromUSDToCent = amount => amount * 100;

const successPayment = data => {
  alert('Payment Successful');
};

const errorPayment = data => {
  alert('Payment Error');
};

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountType: null,
      uid: fire.currentUser.uid,
    };
  }

  componentDidMount() {
    this.typeAcct(this.props.amount);
    console.log('Test', typeof this.props.amount);
  }

  typeAcct = amount => {
    console.log('TypeAcct', amount);
    if (Number(amount) === 5) {
      this.setState({accountType: 1});
    } else if (Number(amount) === 15) {
      this.setState({accountType: 2});
    } else if (Number(amount) === 30) {
      this.setState({accountType: 3});
    }
  };

  onToken = amount => token => {
    if (fire.currentUser) {
      axios
        .post(PAYMENT_SERVER_URL, {
          source: token.id,
          currency: CURRENCY,
          amount: fromUSDToCent(this.props.amount),
        })
        .then(successPayment => {
          console.log(this.state.accountType);
          if (successPayment) {
            const bill = this.state;
            console.log('OnToken:', bill);
            const endpoint = 'http://localhost:5000/api/billing';
            axios
              .post(endpoint, bill)
              .then(successPayment)
              .catch(err => console.log(err));
          }
        })
        .catch(errorPayment);
    }
  };
  render() {
    if (this.state.accountType === null) return null;

    return (
      <StripeCheckout
        name={this.props.name}
        email={fire.currentUser.email}
        amount={fromUSDToCent(this.props.amount)}
        token={this.onToken(this.props.amount, this.state.accountType)}
        currency={CURRENCY}
        stripeKey={STRIPE_PUBLISHABLE}
      />
    );
  }
}

export default Checkout;
