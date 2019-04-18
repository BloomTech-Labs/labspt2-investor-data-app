import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import {
  Avatar,
  CssBaseline,
  Typography,
  Grid,
  Paper
} from "@material-ui/core";
import {fire} from '../Auth/firebaseConfig'
import LiveTicker from "./LiveTicker";
import YourFavorites from "./YourFavorites";
import KeyIndicators from './KeyIndicators'
import styles from "../Styles/Dashboard/styles";
import GridItem from "../Styles/Dashboard/GridItem.jsx"
import GridContainer from '../Styles/Dashboard/GridContainer.jsx'
class Dashboard extends Component {
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
        <GridContainer>
          <Grid container justify="space-between" alignItems="flex-end">
          <Typography variant="h6" gutterBottom className={classes.welcome}>
          Welcome, {""}{fire.currentUser.displayName} {""} <br />
         </Typography>
         <p />
            <Avatar
              alt="profile-picture"
              src={fire.currentUser.photoURL}
              className={classes.bigAvatar}
            />
          </Grid>

          <Grid container justify="center">
            <Grid
              spacing={24}
              alignItems="center"
              justify="center"
              container
              className={classes.grid}
            >

              <Grid item xs={12} md={12}>
                
                  <div className={classes.liveticker}>
                    <Typography variant="h5" gutterBottom> 
                      <KeyIndicators />
                    </Typography>
                  </div>
             
              </Grid>

            

              <Grid item xs={12} md={12}>
                <Paper className={classes.paper}>
                  <Typography variant="h5" gutterBottom>
                    <YourFavorites />
                  </Typography>
                  </Paper>
              </Grid>
              <Grid item xs={12}>
                <div className={classes.block}>
                  <p />
                  <Typography variant="h5" gutterBottom>
                      Dashboard 
                  </Typography>

             <p />
                <Typography variant="h6" gutterBottom>
                    
                    <LiveTicker />
                  </Typography>
                  </div>
              </Grid>
            </Grid>
          </Grid>
          </GridContainer> 
        </div>
      </React.Fragment>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);
