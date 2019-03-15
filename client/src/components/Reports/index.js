import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { CssBaseline, Paper, Typography, Grid } from "@material-ui/core";

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.grey["100"],
    overflow: "hidden",
    height: "100vh"
  },
  grid: {
    width: 1200,
    margin: `0 ${theme.spacing.unit * 2}px`,
    [theme.breakpoints.down("sm")]: {
      width: "calc(100% - 20px)"
    }
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  stockInfo: {
    display: "flex",
    justifyContent: "flex-start"
    // alignItems: "center"
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

class Reports extends Component {
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <Grid container justify="center">
            <Grid
              spacing={24}
              alignItems="center"
              justify="center"
              container
              className={classes.grid}
            >
              <Grid item xs={12}>
                <div className={classes.topBar}>
                  <div className={classes.block}>
                    <Typography variant="h2" gutterBottom>
                      AAPL
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="h4" gutterBottom>
                      Target Score: 15
                    </Typography>
                  </div>
                </div>
                <div className={classes.block}>
                  <div className={classes.stockInfo}>
                    <Typography variant="h6" gutterBottom>
                      Price: 10
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      Price: 10
                    </Typography>
                  </div>
                  <div className={classes.stockInfo}>
                    <Typography variant="h6" gutterBottom>
                      Price: 10
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      Price: 10
                    </Typography>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} md={12}>
                <Paper
                  className={classes.paper}
                  style={{ position: "relative" }}
                >
                  <Typography variant="h5" gutterBottom>
                    Insert tabs and chart here.
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

export default withStyles(styles)(Reports);
