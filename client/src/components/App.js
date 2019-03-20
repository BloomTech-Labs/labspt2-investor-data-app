import React, { Component } from "react";
import { withRouter } from "react-router";
import { Switch, Route, Redirect } from "react-router-dom";

import Navigation from "../components/Navigation"
import Landing from "../components/Landing";
import Dashboard from "../components/Dashboard";
import Settings from "../components/Settings";
import Billing from "../components/Billing";
import * as ROUTES from "../constants/routes";
import app from "./Auth/firebaseConfig"
import "./App.css";
import Signin from "../components/Auth/Singin";

const AuthenticatedRoute = ({component: Component, authenticated, ...rest}) => {
  return(
    <Route 
    {...rest}
     render={(props) => authenticated === true
      ? <Component {...props} {...rest} />
      : <Redirect to={{pathname: '/signin', state: {from: props.location}}} /> } />
  )

}
class App extends Component {

  state = {
    authenticated: false,
    currentUser: null, 

   }
setCurrentUser = (user) => {
if (user) {
  this.setState({
    currentUser: user,
    authenticated: true,
  })
} else {
  this.setState({
    currentUser: null,
    authenticated: false,
  })
}
}

componentDidMount =() => {
app.auth().onAuthStateChanged((user) => {
    if (user) {
      this.setState({
        currentUser: user,
        authenticated: true
      })
      console.log("user", user)
    } else {
      this.setState({
        currentUser: null,
        authenticated: false
      })
    }
  }

  )

}
  render() {
    
    return (
    
      <div>
        <Navigation />
        <br />
       <Switch>
          
          <Route exact path={ROUTES.LANDING} component={Landing} />
          <AuthenticatedRoute authenticated={this.state.authenticated} path={ROUTES.DASHBOARD} component={Dashboard} />
          <AuthenticatedRoute authenticated={this.state.authenticated} path={ROUTES.SETTINGS} component={Settings} />
          <Route path={ROUTES.BILLING} component={Billing} />
          {/* <Route path={ROUTES.REPORTS} component={} /> */}
           <Route exact path='/signin' render={(props) =>{return <Signin setCurrentUser ={this.setCurrentUser} {...props}/>}} />   
         {/*} <Route path={ROUTES.SIGNUP} component={} /> */}
        </Switch> 
    

        
        
      </div>
    );
  }
}

export default withRouter(App);
