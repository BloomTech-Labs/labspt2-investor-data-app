import React, { Component } from "react";
import { withRouter } from "react-router";
import { Switch, Route } from "react-router-dom";

import Navigation from "../components/Navigation"
import Landing from "../components/Landing";
import Dashboard from "../components/Dashboard";
import Settings from "../components/Settings";
import Billing from "../components/Billing";
// import Signin from "../components/Navigation/SigninModal"

import * as ROUTES from "../constants/routes";
import "./App.css";
import firebase from "firebase"
import fire from "../components/Auth/firebase" // This is being used to provide apiKey to Authentication do not remove
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"

class App extends Component {

  state = {
    isSignedIn:false
   }
   uiConfig = {
    signInFlow:"popup",
    signInOptions : [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }
componentDidMount =() =>{
  
  firebase.auth().onAuthStateChanged(user => {
    this.setState({isSignedIn:!!user})
    console.log("user", user)
  })
}


  render() {
    return (
    
      <div>
        <Navigation />
        <Route exact path={ROUTES.LANDING} component={Landing} />
        {this.state.isSignedIn ? ( <Switch>
          <Route path={ROUTES.DASHBOARD} component={Dashboard} />
          <Route path={ROUTES.SETTINGS} component={Settings} />
          <Route path={ROUTES.BILLING} component={Billing} />
          {/* <Route path={ROUTES.REPORTS} component={} /> */}
          {/* <Route path={ROUTES.SIGNIN} component={} />   
          <Route path={ROUTES.SIGNUP} component={} /> */}
        </Switch> ): (<StyledFirebaseAuth uiConfig = {this.uiConfig} firebaseAuth={firebase.auth()} />)}

        
      </div>
    );
  }
}

export default withRouter(App);
