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
import firebase from "firebase"
import fire from "./Auth/firebaseConfig" // This is being used to provide apiKey to Authentication do not remove
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"

const fireApp = firebase.initializeApp(fire)
class App extends Component {

  state = {
    isSignedIn:false
   }
   uiConfig = {
    signInFlow:"popup",
    signInOptions : [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
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
        <br />
        
        {this.state.isSignedIn ? ( <Switch>
          <Route exact path={ROUTES.LANDING} component={Landing} />
          <Route path={ROUTES.DASHBOARD} component={Dashboard} />
          <Route path={ROUTES.SETTINGS} component={Settings} />
          <Route path={ROUTES.BILLING} component={Billing} />
          {/* <Route path={ROUTES.REPORTS} component={} /> */}
          {/* <Route path={ROUTES.SIGNIN} component={} />   
          <Route path={ROUTES.SIGNUP} component={} /> */}
        </Switch> ): (<StyledFirebaseAuth uiConfig = {this.uiConfig} firebaseAuth={fireApp.auth()} />)
      } 

        
        
      </div>
    );
  }
}

export default withRouter(App);
