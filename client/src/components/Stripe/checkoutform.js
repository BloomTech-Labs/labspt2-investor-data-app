import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import axios from "axios";
import { fire } from "../Auth/firebaseConfig";
import PAYMENT_SERVER_URL from "../../constants/server";
import ThankYou from "../ThankYou/index";

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = { complete: false };
    this.submit = this.submit.bind(this);
  }
  componentDidMount() {
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
  async submit(ev) {
    let { token } = await this.props.stripe.createToken({ name: "Name" });
    let response = axios.post(PAYMENT_SERVER_URL, {
      source: token.id,
      email: fire.currentUser.email,
      plan: this.props.stripePlan
    });

    if (response.ok) console.log("Purchase Complete!");
    this.setState({ complete: true });
    const bill = this.state;
    console.log(bill);
    const endpoint = "https://pickemm.herokuapp.com/api/billing";
    axios.post(endpoint, bill);
  }

  render() {
    return this.state.complete ? (
      <ThankYou />
    ) : (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={this.submit}>Send</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
