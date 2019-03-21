import React, {Component} from 'react'
import firebase from "firebase"
import { fire } from "./firebaseConfig" // This is being used to provide apiKey to Authentication do not remove
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import {Redirect} from 'react-router-dom'

export default class Signin extends Component {


   uiConfig = {
    signInFlow:"popup",
    signInOptions : [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
        signInSuccessWithAuthResult: () => false
    }
  }


    render(){
    const { from } = this.props.location.state || { from: { pathname: '/' } }
  
    if (this.props.redirect === true) {
      return <Redirect to={from} />
      
    }
    console.log(this.props.redirect)
        return(
            <div>
                <StyledFirebaseAuth  uiConfig={this.uiConfig}
                                firebaseAuth={fire}  user={this.props.user}/>
            </div>
    )
    }
        
}