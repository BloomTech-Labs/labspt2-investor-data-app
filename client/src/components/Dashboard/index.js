import React, { Component } from "react";
import PropTypes from 'prop-types'
import withStyles from "@material-ui/core/styles/withStyles";
import {Avatar, CssBaseline, Paper, Typography, Grid } from "@material-ui/core";
import LiveTicker from './LiveTicker'
import YourFavorites from './YourFavorites'
import firebase from 'firebase'
const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.grey["100"],
    overflow: "hidden",
    //height: "100vh"
  },
  grid: {
    width: 1200,
    margin: `0 ${theme.spacing.unit * 2}px`,
    [theme.breakpoints.down("sm")]: {
      width: "calc(100% - 20px)"
    }
  },
  paper: {
    padding: theme.spacing.unit * 3,
    textAlign: "left",
    color: theme.palette.text.secondary
    // height: '40vh',
  },
  block: {
    padding: theme.spacing.unit * 2
  }
});

class Dashboard extends Component {
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        {/* Add Navigation here */}
        <div className={classes.root}>
        <Grid container justify="flex-end" alignItems="center">
      
        <Typography variant='h6' color="inherit" gutterBottom>
            Welcome, {firebase.auth().currentUser.displayName} <br />
            </Typography>
            
              <Avatar alt="profile-picture" src={firebase.auth().currentUser.photoURL} className={classes.bigAvatar} />
              </Grid>
            
          <Grid container justify="center">
            <Grid
              spacing={24}
              alignItems="center"
              justify="center"
              container
              className={classes.grid}
            >
              <Grid item xs={12}>
                <div className={classes.block}>
             
                  <Typography variant="h6" gutterBottom>
                    Dashboard
                  </Typography>
                </div>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper className={classes.paper}>
                  <div>
                    <Typography variant="h5" gutterBottom>
                        Key Indicators
                    </Typography>
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper className={classes.paper}>
                    <Typography variant="h6" gutterBottom>
                      <LiveTicker />
                    </Typography>
                </Paper>
              </Grid> 
              <Grid item xs={12} md={7}>
                <Paper
                  className={classes.paper}
                  style={{ position: "relative" }}
                >
                  <Typography variant="h5" gutterBottom>
                      <YourFavorites />
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>    
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Dashboard);
