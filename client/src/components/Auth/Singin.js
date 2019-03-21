import React, {Component} from 'react'
import firebase from "firebase"
import { fire } from "./firebaseConfig" // This is being used to provide apiKey to Authentication do not remove
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"

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
     
        return(
            <div>
                <StyledFirebaseAuth  uiConfig={this.uiConfig}
                                firebaseAuth={fire}/>
            </div>
    )
    }
        
}