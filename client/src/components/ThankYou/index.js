import React, { Component } from "react";
import * as ROUTES from "../../constants/routes";
import { Link } from "react-router-dom";

class ThankYou extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <div>
          <h2>Thank you!</h2>
          <p>Where would you like to go to?</p>
        </div>
        <Link to={ROUTES.SETTINGS}>
          <button>Settings</button>
          <div />
        </Link>
        <Link to={ROUTES.DASHBOARD}>
          <button>Dashboard</button>
        </Link>
      </div>
    );
  }
}
export default ThankYou;
