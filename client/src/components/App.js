import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {Switch, Route, Redirect} from 'react-router-dom';

import Navigation from '../components/Navigation';
import Landing from '../components/Landing';
import Dashboard from '../components/Dashboard';
import Settings from '../components/Settings';
import Billing from '../components/Billing';
import Reports from '../components/Reports';
import * as ROUTES from '../constants/routes';
import './App.css';
import Signin from './Auth/Signin';
import {fire} from './Auth/firebaseConfig';
import axios from 'axios';

const AuthenticatedRoute = ({component: Component, authenticated, ...rest}) => {
  return (
    <Route
      {...rest}
      render={props =>
        authenticated === true ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect to={{pathname: '/signin', state: {from: props.location}}} />
        )
      }
    />
  );
};
class App extends Component {
  state = {
    authenticated: false,
    currentUser: null,
    firstName: null,
    lastName: null,
    currentEmail: null,
    userUID: null,
    redirect: false,
  };

  componentDidMount = () => {
    this.removeAuthListener = fire.onAuthStateChanged(user => {
      if (user) {
        // Last # of occurrence of Space
        let space = user.displayName.lastIndexOf(' ');

        this.setState({
          currentUser: user,
          authenticated: true,
          redirect: true,
          currentEmail: user.email,
          firstName: user.displayName.substring(0, space),
          lastName: user.displayName.substring(space + 1),
          userUID: user.uid,
        });
        // If the user is the Authenticated use pass their information to the database

        this.addCurrentUser(user);
      } else {
        this.setState({
          currentUser: null,
          authenticated: false,
          redirect: false,
          currentEmail: null,
          userUID: null,
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
    const endpoint = 'https://pickemm.herokuapp.com/api/users';
    axios
      .post(endpoint, creds)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  };
  componentWillUnmount = () => {
    this.removeAuthListener();
  };
  render() {
    const {currentUser} = this.state;
    const {redirect} = this.state;

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
