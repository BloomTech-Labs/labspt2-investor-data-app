import React, { Component } from "react";
import { withRouter } from "react-router";
import { Switch, Route, Redirect } from "react-router-dom";
import Navigation from "../components/Navigation";
import Landing from "../components/Landing";
import Dashboard from "../components/Dashboard";
import Settings from "../components/Settings";
import Billing from "../components/Billing";
import Reports from "../components/Reports";
import * as ROUTES from "../constants/routes";
import "./App.css";
import Signin from "./Auth/Signin";
import { fire } from "./Auth/firebaseConfig";
import axios from "axios";
import ThankYou from "../components/ThankYou";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { css } from "glamor";
//Calling Toastify without toast container
toast.configure();
//URL Endpoints
// const URL = "http://localhost:5000/";
const URL = "https://pickemm.herokuapp.com/";

const AuthenticatedRoute = ({
  component: Component,
  authenticated,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        authenticated === true ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect
            to={{ pathname: "/signin", state: { from: props.location } }}
          />
        )
      }
    />
  );
};
class App extends Component {
  _isMounted = false;
  notify = () => {
    toast(
      <div>
        <h3 style={{ textAlign: "center" }}>NEW FEATURE </h3>
        Automatic Stock Scanner will scan your favorites and send you a text
        message when the MACD Signal Lines cross. To activate this feature go to
        the settings page add your phone number. Then enable Text's under the
        Email and Text Preferences."
      </div>,
      {
        className: css({
          background: "#7407a7",
          color: "white"
        })
      }
    );
  };

  state = {
    authenticated: false,
    currentUser: null,
    firstName: null,
    lastName: null,
    currentEmail: null,
    userUID: null,
    redirect: false
  };

  componentDidMount = () => {
    this._isMounted = true;
    this.removeAuthListener = fire.onAuthStateChanged(async user => {
      if (user) {
        // Last # of occurrence of Space
        return await fire.currentUser
          .getIdToken()
          .then(idToken => {
            let space = user.displayName.lastIndexOf(" ");
            this.notify();
            axios.defaults.headers.common["Authorization"] = idToken;
            this.setState({
              currentUser: user,
              authenticated: true,
              redirect: true,
              currentEmail: user.email,
              firstName: user.displayName.substring(0, space),
              lastName: user.displayName.substring(space + 1),
              userUID: user.uid
            });
            this.addCurrentUser(user);
          })
          .catch(err => console.log("error ", err));

        // If the user is the Authenticated use pass their information to the database
      } else {
        this.setState({
          currentUser: null,
          authenticated: false,
          redirect: false,
          currentEmail: null,
          userUID: null
        });
      }
    });
  };
  //To sign out an get no error with firebase dropping the widget
  removeAuthListener: any;
  // Add current user method will grab the information from state create new user in our database
  addCurrentUser = () => {
    function newUser(firstName, lastName, email, uid) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.uid = uid;
    }
    const creds = new newUser(
      this.state.firstName,
      this.state.lastName,
      this.state.currentEmail,
      this.state.userUID
    );
    const endpoint = `${URL}api/users`;
    axios
      .post(endpoint, creds)
      .then(res => {
        console.log("User logged in successfully");
      })
      .catch(err => console.log("Error in getting user"));
  };
  componentWillUnmount = () => {
    this._isMounted = false;
    this.removeAuthListener();
  };
  render() {
    const { currentUser } = this.state;
    const { redirect } = this.state;

    return (
      <div>
        <Navigation authenticated={this.state.authenticated} />
        <Switch>
          <Route exact path={ROUTES.LANDING} component={Landing} />
          <AuthenticatedRoute
            authenticated={this.state.authenticated}
            path={ROUTES.DASHBOARD}
            component={Dashboard}
          />
          <AuthenticatedRoute
            authenticated={this.state.authenticated}
            path={ROUTES.SETTINGS}
            component={Settings}
          />
          <Route
            path={ROUTES.BILLING}
            render={props => {
              return (
                <Billing authenticated={this.state.authenticated} {...props} />
              );
            }}
          />
          <AuthenticatedRoute
            authenticated={this.state.authenticated}
            path={ROUTES.REPORTS}
            component={Reports}
          />
          <Route exact path={ROUTES.THANKYOU} component={ThankYou} />
          <Route
            exact
            path={ROUTES.SIGNIN}
            render={props => {
              return (
                <Signin user={currentUser} redirect={redirect} {...props} />
              );
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
