import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import {
  Avatar,
  CssBaseline,
  Typography,
  Grid
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
            <br />
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

              <GridItem xs={12} md={12}>
                
                  <div>
                    <Typography variant="h5" gutterBottom>
                        <KeyIndicators/>
                    </Typography>
                  </div>
             
              </GridItem>

              <Grid container xs={12} md={4} sm={3} className={classes.liveticker}>
             
                  
                    <Typography variant="h6" gutterBottom>
                    
                      <LiveTicker />
                    </Typography>
                
  
              </Grid>
              <Grid item xs={12} md={12}>
                
                  <Typography variant="h5" gutterBottom>
                    <YourFavorites />
                  </Typography>
               
              </Grid>
              <Grid item xs={12}>
                <div className={classes.block}>
                  <Typography variant="h6" gutterBottom>
                 Welcome, {""}{fire.currentUser.displayName}<p /> 
                  Dashboard
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
