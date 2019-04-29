import { Component } from "react";
//import axios from "axios";
//import StripeCheckout from "react-stripe-checkout";
//import STRIPE_PUBLISHABLE from "../../constants/stripe";
//import PAYMENT_SERVER_URL from "../../constants/server";
import { fire } from "../Auth/firebaseConfig";

class Checkout2 extends Component {
    constructor(props) {
      super(props);
      this.state = {
        accountType: null,
        usersId: fire.currentUser.uid,
        stripe: null
      };
      
   componentDidMount () { this.setState({ stripe: window.Stripe('pk_test_7mDiIF0ntVgLJjKz6B7evL0i00J88bDjzD')})}
   
   var checkoutButton = document.querySelector("#checkout-button");
   checkoutButton.addEventListener("click", function() {
     this.state.stripe.redirectToCheckout({
       items: [
         {
           // Define the product and plan in the Dashboard first, and use the plan
           // ID in your client-side code.
           plan: "plan_EZcJ1irJxirScy",
           quantity: 1
         }
       ],
       successUrl: "https://www.example.com/success",
       cancelUrl: "https://www.example.com/cancel"
     });
   });
    }
render() {
  return (
    <button id="checkout-button">Subscribe</button>
  );
}
}
export default Checkout2;
