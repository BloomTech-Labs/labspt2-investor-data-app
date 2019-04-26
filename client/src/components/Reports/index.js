import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
// Redux imports
import { connect } from "react-redux";
import { getAcct } from "../../actions/reportsActions";
import { fire } from "../Auth/firebaseConfig";
import {
  CssBaseline,
  Paper,
  Typography,
  Grid,
  AppBar,
  Tabs,
  Tab,
  TextField,
  MenuItem,
  Popper
} from "@material-ui/core";
import styles from "../Styles/Reports/styles";
import { LoadingContainer } from "../Styles/Reports/Reports";
import { ImpulseSpinner, FireworkSpinner } from "react-spinners-kit";

import deburr from "lodash/deburr";
import Autosuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";

import { getData } from "./utils";

import MAChart from "./Charts/MAChart";
import MACDChart from "./Charts/MACDChart";
import PriceChart from "./Charts/PriceChart";
import RSIChart from "./Charts/RSIChart";
import SARChart from "./Charts/SARChart";
import { suggestions } from "./suggestions";

const TabContainer = props => {
  return (
    <Typography component="div" style={{ padding: 8 * 2 }}>
      {props.children}
    </Typography>
  );
};

const renderInputComponent = inputProps => {
  const { classes, inputRef = () => {}, ref, ...other } = inputProps;

  return (
    <TextField
      fullWidth={true}
      InputProps={{
        inputRef: node => {
          ref(node);
          inputRef(node);
        },
        classes: {
          input: classes.input
        }
      }}
      {...other}
    />
  );
};

const renderSuggestion = (suggestion, { query, isHighlighted }) => {
  const matches = match(suggestion.label, query);
  const parts = parse(suggestion.label, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) =>
          part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </strong>
          )
        )}
      </div>
    </MenuItem>
  );
};

const getSuggestions = value => {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : suggestions.filter(suggestion => {
        const keep =
          count < 5 &&
          suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
};

const getSuggestionValue = suggestion => {
  return suggestion.label;
};

class Reports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      data: [],
      ticker: "",
      single: "",
      popper: "",
      suggestions: []
    };
  }
  componentDidMount() {
    const uid = fire.currentUser.uid;
    this.props.getAcct(uid);
    console.log("CDM Fetching", this.props.fetchBilling);

    if (this.props.location.state) {
      getData(this.props.location.state.ticker).then(data => {
        this.setState({ data, ticker: this.props.location.state.ticker });
      });
    } else {
      getData("AAPL").then(data => {
        this.setState({ data, ticker: "AAPL" });
      });
    }
  }

  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  handleChange = name => (event, { newValue }) => {
    this.setState({
      [name]: newValue
    });
  };

  onSuggestionSelected = (
    event,
    { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }
  ) => {
    getData(suggestionValue)
      .then(data => {
        this.setState({ data, ticker: suggestionValue });
      })
      .catch(err => {
        alert("The stock you selected is not available at this time.");

        this.setState({ data: [], ticker: "" });
      });
  };

  // TODO: Figure out how to make the first tab be selected by default
  handleTabChange = (event, value) => {
    this.setState({ value });
  };

  // TODO: Move these helper functions to a separate file for use here and in the stock ticker
  changePercent = (close, start) => {
    // function for calculating the change of a stocks gain/loss by %
    let deduct = close - start;
    let divide = deduct / start;
    let solution = divide * 100;
    if (solution > 0) {
      return "+" + solution.toFixed(2);
    }
    return solution.toFixed(2);
  };

  changePoints = (close, start) => {
    // calculates the change of a stocks gain/loss by points
    let solution = close - start;
    if (solution > 0) {
      return "+" + solution.toFixed(1);
    }
    return solution.toFixed(1);
  };

  decimalToFixed = input => {
    // truncates the numbers following the decimal to two digits
    input = parseFloat(input).toFixed(2);
    return input;
  };

  shortenVolume = num => {
    // Crunches the length of the volume into a smaller number while inserting a decimal point and character representing the amount
    let str,
      suffix = "";

    let decimalPlaces = 2 || 0;

    num = +num;

    let factor = Math.pow(10, decimalPlaces);

    if (num < 1000) {
      str = num;
    } else if (num < 1000000) {
      str = Math.floor(num / (1000 / factor)) / factor;
      suffix = "K";
    } else if (num < 1000000000) {
      str = Math.floor(num / (1000000 / factor)) / factor;
      suffix = "M";
    } else if (num < 1000000000000) {
      str = Math.floor(num / (1000000000 / factor)) / factor;
      suffix = "B";
    }
    return str + suffix;
  };

  render() {
    const { classes } = this.props;
    const { value, data } = this.state;
    console.log("Render Fetching", this.props.fetchBilling);
    const autosuggestProps = {
      renderInputComponent,
      suggestions: this.state.suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      onSuggestionSelected: this.onSuggestionSelected,
      getSuggestionValue,
      renderSuggestion
    };

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
                    <Typography variant="h2">
                      {this.state.ticker ? (
                        this.state.ticker
                      ) : (
                        <LoadingContainer>
                          <ImpulseSpinner
                            size={35}
                            frontColor="#EFEFEF"
                            backColor="#301548"
                          />
                        </LoadingContainer>
                      )}
                    </Typography>
                  </div>
                  <div>
                    <Autosuggest
                      {...autosuggestProps}
                      inputProps={{
                        classes,
                        placeholder: "Search...",
                        value: this.state.popper,
                        onChange: this.handleChange("popper"),
                        inputRef: node => {
                          this.popperNode = node;
                        },
                        InputLabelProps: {
                          shrink: true
                        }
                      }}
                      theme={{
                        suggestionsList: classes.suggestionsList,
                        suggestion: classes.suggestion
                      }}
                      renderSuggestionsContainer={options => (
                        <Popper
                          anchorEl={this.popperNode}
                          open={Boolean(options.children)}
                        >
                          <Paper
                            square
                            {...options.containerProps}
                            style={{
                              width: this.popperNode
                                ? this.popperNode.clientWidth
                                : null
                            }}
                          >
                            {options.children}
                          </Paper>
                        </Popper>
                      )}
                    />
                  </div>
                </div>
                <div className={classes.block}>
                  <div className={classes.stockInfo}>
                    <Typography variant="h6">
                      Price: $
                      {data.length
                        ? this.decimalToFixed(data[data.length - 1].close)
                        : ""}
                    </Typography>
                    <Typography variant="h6" style={{ marginLeft: "50px" }}>
                      Change:{" "}
                      {data.length
                        ? this.changePoints(
                            data[data.length - 1].close,
                            data[data.length - 1].open
                          )
                        : ""}
                    </Typography>
                  </div>
                  <div className={classes.stockInfo}>
                    <Typography variant="h6">
                      Volume:{" "}
                      {data.length
                        ? this.shortenVolume(data[data.length - 1].volume)
                        : ""}
                    </Typography>
                    <Typography variant="h6" style={{ marginLeft: "50px" }}>
                      Change %:{" "}
                      {data.length
                        ? this.changePercent(
                            data[data.length - 1].close,
                            data[data.length - 1].open
                          )
                        : ""}
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
                      value={value ? value : 0}
                      onChange={this.handleTabChange}
                      indicatorColor="secondary"
                      color="secondary"
                      variant="scrollable"
                      scrollButtons="auto"
                    >
                      <Tab label="Price" />
                      <Tab label="Moving Average (MA)" />
                      {this.props.billing.accountType === 3
                        ? [
                            <Tab
                              key={0}
                              label="Moving Average Convergence (MACD)"
                            />,
                            <Tab
                              key={1}
                              label="Relative Strength Index (RSI)"
                            />,
                            <Tab
                              key={2}
                              label="Parabolic Stop and Reverse (SAR)"
                            />
                          ]
                        : null}
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
                  {value === 3 && (
                    <TabContainer>
                      <RSIChart data={this.state.data} />
                    </TabContainer>
                  )}
                  {value === 4 && (
                    <TabContainer>
                      <SARChart data={this.state.data} />
                    </TabContainer>
                  )}
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    fetchBilling: state.ReportsReducer.fetchingBilling,
    error: state.ReportsReducer.error,
    billing: state.ReportsReducer.billing
  };
};

const mapDispatchToProps = dispatch => ({
  getAcct: acct => dispatch(getAcct(acct))
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Reports)
);
