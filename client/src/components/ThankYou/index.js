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
          <h1>Thank You </h1>
          <h3>Would you like to go to?</h3>
        </div>
        <Link to={ROUTES.SETTINGS}>
          <button>Settings</button>
        </Link>
        <Link to={ROUTES.DASHBOARD}>
          <button>Dashboard</button>
        </Link>
      </div>
    );
  }
}
export default ThankYou;
