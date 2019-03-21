import React, {Component} from 'react'
import firebase from "firebase"
import { fire } from "./firebaseConfig" // This is being used to provide apiKey to Authentication do not remove
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import { Redirect } from 'react-router-dom'
export default class Signin extends Component {
constructor(props) {
  super(props)
  this.state = {
    redirect: false
}
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
        signInSuccessWithAuthResult: () => false
    }
  }


    render(){
      const redirect = this.state
      const location  = this.props
      const { from } = location.state || { from: { pathname: '/' } }
      if (redirect === true) {
        return <Redirect to={from} />
      } 
     
      console.log(redirect)
        return(
            <div>
              
                <StyledFirebaseAuth  uiConfig={this.uiConfig}
                                firebaseAuth={fire}/>
            </div>
    )
    }
        
}