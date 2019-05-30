import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import {
  Avatar,
  CssBaseline,
  Typography,
  Grid,
  Paper,
  TextField,
  MenuItem,
  Popper,
  Zoom
} from "@material-ui/core";
import { fire } from "../Auth/firebaseConfig";
//import LiveTicker from "../Dashboard/LiveTicker";
import Investments from "./Investments";
//import KeyIndicators from "../Dashboard/KeyIndicators";
import BalanceInfo from "./BalanceInfo";
import styles from "../Styles/Stocks/styles";
import GridContainer from "../Styles/Stocks/GridContainer.jsx";
import deburr from "lodash/deburr";
import Autosuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import { suggestions } from "../Reports/suggestions";
import axios from "axios";

//const URL = "https://pickemm.herokuapp.com/api";
const URL = "http://localhost:5000/api";

const renderInputComponent = inputProps => {
  const { classes, inputRef = () => {}, ref, ...other } = inputProps;

  return (
    <TextField
      fullWidth
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

class Stocks extends Component {
  state = {
    value: 0,
    data: [],
    ticker: "",
    single: "",
    popper: "",
    suggestions: [],
    uid: fire.currentUser.uid,
    checked: false
  };

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
  onKeyDown = e => {
    if (e.key === "Enter") {
      this.handleChange();
    }
  };

  onSuggestionSelected = (
    event,
    { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }
  ) => {
    const newSymbol = {
      symbol: suggestionValue,
      uid: this.state.uid
    };
    axios
      .post(`${URL}/stocks`, newSymbol)
      .then(response => {
        this.setState({
          newSymbol: { symbol: "", uid: "" }
        });
        window.location.reload();
      })
      .catch(err => {
        console.log("we've encountered an error");
      });
  };

  render() {
    const { checked } = this.state;
    const { classes } = this.props;

    const autosuggestProps = {
      renderInputComponent,
      onKeyPress: this.onKeyDown,
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
          <GridContainer>
            <Grid container justify="space-between" alignItems="flex-end">
              <Typography variant="h6" gutterBottom className={classes.welcome}>
                Welcome, {""}
                {fire.currentUser.displayName} {""} <br />
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
                <Grid item sm={4}>
                  <Paper className={classes.paper}>
                    <Zoom in={checked}>
                      <Investments />
                    </Zoom>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <div className={classes.block}>
                    <Typography
                      variant="h5"
                      gutterBottom
                      style={{ paddingLeft: "20px" }}
                    >
                      Stocks
                    </Typography>
                    <div>
                      <Autosuggest
                        {...autosuggestProps}
                        inputProps={{
                          classes,
                          placeholder: "Get Stock info...",
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
                          suggestion: classes.suggestion,
                          input: {
                            marginLeft: 20,
                            width: 180,
                            height: 30,
                            paddingBottom: 20
                          }
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
                    <BalanceInfo />
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

Stocks.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Stocks);
