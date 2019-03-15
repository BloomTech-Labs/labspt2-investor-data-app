import React, { Component } from "react";
import { withRouter } from "react-router";
import { Switch, Route } from "react-router-dom";

import Navigation from "../components/Navigation"
import Landing from "../components/Landing";
import Dashboard from "../components/Dashboard";
import Settings from "../components/Settings";
import Billing from "../components/Billing";

import * as ROUTES from "../constants/routes";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <Switch>
          <Route exact path={ROUTES.LANDING} component={Landing} />
          <Route path={ROUTES.DASHBOARD} component={Dashboard} />
          <Route path={ROUTES.SETTINGS} component={Settings} />
          <Route path={ROUTES.BILLING} component={Billing} />
          {/* <Route path={ROUTES.REPORTS} component={} /> */}
          {/* <Route path={ROUTES.SIGNIN} component={} />
          <Route path={ROUTES.SIGNUP} component={} /> */}
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
