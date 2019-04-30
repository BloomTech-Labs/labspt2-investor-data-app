import React, { Component } from "react";
import axios from "axios";
import STRIPE_PUBLISHABLE from "../../constants/stripe";
import { fire } from "../Auth/firebaseConfig";

class Checkout2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountType: null,
      usersId: fire.currentUser.uid
    };
    this.onPayButtonClick = this.onPayButtonClick.bind(this);
  }

  componentDidMount() {
    this.setState({
      // Replace with your own public test key
      stripe: window.Stripe(STRIPE_PUBLISHABLE)
    });
    this.typeAcct(this.props.amount);
  }

  typeAcct = amount => {
    if (Number(amount) === 5) {
      this.setState({ accountType: 1 });
    } else if (Number(amount) === 15) {
      this.setState({ accountType: 2 });
    } else if (Number(amount) === 30) {
      this.setState({ accountType: 3 });
    }
  };

  onPayButtonClick(e) {
    const bill = this.state;
    console.log(bill);
    const endpoint = "http://localhost:5000/api/billing";
    axios
      .post(endpoint, bill)
      .then(() => {
        console.log("testing axios and stripe");
        this.state.stripe
          .redirectToCheckout({
            items: [{ plan: this.props.stripePlan, quantity: 1 }],
            customerEmail: fire.currentUser.email,
            successUrl: "http://localhost:3000/thankyou",
            cancelUrl: "https://getpickem.co/canceled"
          })
          .then(function(result) {
            // Display result.error.message to your customer
            this.setState({ error: result.error.message });
          });
      })
      .catch(err => console.log("error ", err));
  }
  render() {
    return (
      <div>
        <div>
          <h2>Click the button below to launch Stripe Checkout</h2>
        </div>
        <div>
          <button className="pay-button" onClick={this.onPayButtonClick}>
            Subscribe
          </button>
        </div>
        {this.state.error ? (
          <div className="error">{this.state.error}</div>
        ) : null}
      </div>
    );
  }
}

export default Checkout2;
