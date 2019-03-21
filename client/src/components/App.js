import React, { Component } from "react";
import { withRouter } from "react-router";
import { Switch, Route, Redirect } from "react-router-dom";

import Navigation from "../components/Navigation"
import Landing from "../components/Landing";
import Dashboard from "../components/Dashboard";
import Settings from "../components/Settings";
import Billing from "../components/Billing";
import * as ROUTES from "../constants/routes";
import "./App.css";
import Signin from "../components/Auth/Singin";
import {  fire  } from './Auth/firebaseConfig'

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
    redirect: false

   }

componentDidMount =() => {
  this.removeAuthListener = fire.onAuthStateChanged((user) => {
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
componentWillUnmount = () => {
  this.removeAuthListener()
}
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { currentUser }= this.state
    if (this.state.redirect === true) {
      return <Redirect to={from} />
      
    }
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
           <Route exact path={ROUTES.SIGNIN} render={(props) =>{return <Signin user ={currentUser} {...props}/>}} />   
         {/*} <Route path={ROUTES.SIGNUP} component={} /> */}
        </Switch> 
    

        
        
      </div>
    );
  }
}

export default withRouter(App);
