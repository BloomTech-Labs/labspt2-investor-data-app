import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { fade } from "@material-ui/core/styles/colorManipulator";
import {
  CssBaseline,
  Paper,
  Typography,
  Grid,
  AppBar,
  Tabs,
  Tab,
  InputBase
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { getData } from "./Charts/utils";

import MAChart from "./Charts/MAChart";
import MACDChart from "./Charts/MACDChart";
import PriceChart from "./Charts/PriceChart";

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
  },
  paper: {
    padding: theme.spacing.unit * 3,
    textAlign: "left",
    color: theme.palette.text.secondary
  },
  block: {
    padding: theme.spacing.unit * 2
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.75),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.85)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  }
});

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

class Reports extends Component {
  state = {
    tab: 0,
    data: []
  };

  componentDidMount() {
    getData().then(data => {
      this.setState({ data });
    });
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

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
                    <Typography variant="h2">AAPL</Typography>
                  </div>
                  <div className={classes.search}>
                    <div className={classes.searchIcon}>
                      <SearchIcon />
                    </div>
                    <InputBase
                      placeholder="Search…"
                      classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput
                      }}
                    />
                  </div>
                </div>
                <div className={classes.block}>
                  <div className={classes.stockInfo}>
                    <Typography variant="h6">Price: $148.29</Typography>
                    <Typography variant="h6" style={{ marginLeft: "50px" }}>
                      Change: 6.05
                    </Typography>
                  </div>
                  <div className={classes.stockInfo}>
                    <Typography variant="h6">Volume: 43.2M</Typography>
                    <Typography variant="h6" style={{ marginLeft: "50px" }}>
                      Change %: +2.47
                    </Typography>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} md={12}>
                <Paper
                  className={classes.paper}
                  style={{ position: "relative" }}
                >
                  <AppBar position="static">
                    <Tabs
                      value={value}
                      onChange={this.handleChange}
                      indicatorColor="primary"
                      textColor="secondary"
                      variant="scrollable"
                      scrollButtons="auto"
                    >
                      <Tab label="Price" />
                      <Tab label="Moving Average" />
                      <Tab label="Moving Average Convergence" />
                      {/* <Tab label="Average True Range" />
                      <Tab label="Volume Weighted Average" /> */}
                    </Tabs>
                  </AppBar>
                  {value === 0 && (
                    <TabContainer>
                      <PriceChart data={this.state.data} />
                    </TabContainer>
                  )}
                  {value === 1 && (
                    <TabContainer>
                      <MAChart data={this.state.data} />
                    </TabContainer>
                  )}
                  {value === 2 && (
                    <TabContainer>
                      <MACDChart data={this.state.data} />
                    </TabContainer>
                  )}
                  {/* {value === 3 && <TabContainer>ATR Chart...</TabContainer>}
                  {value === 4 && <TabContainer>VMA Chart...</TabContainer>} */}
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
