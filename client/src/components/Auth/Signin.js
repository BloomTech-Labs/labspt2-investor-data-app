import React, {Component} from 'react'
import firebase from "firebase"
import { fire } from "./firebaseConfig" // This is being used to provide apiKey to Authentication do not remove
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import { Redirect } from 'react-router-dom'
import styles from '../Styles/Signin/styles'
import {withStyles, CssBaseline, Paper, Typography, Avatar} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
class Signin extends Component {


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
    const { classes } = this.props;
    const { from } = this.props.location.state || { from: { pathname: '/' } }
  
    if (this.props.redirect === true) {
      return <Redirect to={from} />
      
    }
        return(
          <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
              
                <StyledFirebaseAuth  uiConfig={this.uiConfig}
                                firebaseAuth={fire}  user={this.props.user}/>
            </Paper>
            </main>
    )
    }
        
}

export default withStyles(styles)(Signin);