import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import axios from "axios";
import { fire } from "../Auth/firebaseConfig";
import PAYMENT_SERVER_URL from "../../constants/server";
// import ThankYou from "../ThankYou/index";
import { Redirect } from "react-router";
import * as ROUTES from "../../constants/routes";

const URL = "https://pickemm.herokuapp.com/api";
// const URL = "http://localhost:5000/api";

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complete: false,
      accountType: null,
      usersId: fire.currentUser.uid
    };
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

    const endpoint = `${URL}/billing`;
    axios.post(endpoint, bill);
  }

  render() {
    if (this.state.complete === true) {
      return <Redirect to={ROUTES.THANKYOU} />;
    }
    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <br />
        <button onClick={this.submit}>Subscribe</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
