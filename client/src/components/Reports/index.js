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
  InputBase,
  TextField,
  MenuItem,
  Popper
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import deburr from "lodash/deburr";
import Autosuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";

import { getData } from "./utils";

import MAChart from "./Charts/MAChart";
import MACDChart from "./Charts/MACDChart";
import PriceChart from "./Charts/PriceChart";
// import suggestions from "./suggestions";

const suggestions = [
  { label: "ABT" },
  { label: "ABBV" },
  { label: "ACN" },
  { label: "ACE" },
  { label: "ADBE" },
  { label: "ADT" },
  { label: "AAP" },
  { label: "AES" },
  { label: "AET" },
  { label: "AFL" },
  { label: "AMG" },
  { label: "A" },
  { label: "GAS" },
  { label: "APD" },
  { label: "ARG" },
  { label: "AKAM" },
  { label: "AA" },
  { label: "AGN" },
  { label: "ALXN" },
  { label: "ALLE" },
  { label: "ADS" },
  { label: "ALL" },
  { label: "ALTR" },
  { label: "MO" },
  { label: "AMZN" },
  { label: "AEE" },
  { label: "AAL" },
  { label: "AEP" },
  { label: "AXP" },
  { label: "AIG" },
  { label: "AMT" },
  { label: "AMP" },
  { label: "ABC" },
  { label: "AME" },
  { label: "AMGN" },
  { label: "APH" },
  { label: "APC" },
  { label: "ADI" },
  { label: "AON" },
  { label: "APA" },
  { label: "AIV" },
  { label: "AMAT" },
  { label: "ADM" },
  { label: "AIZ" },
  { label: "T" },
  { label: "ADSK" },
  { label: "ADP" },
  { label: "AN" },
  { label: "AZO" },
  { label: "AVGO" },
  { label: "AVB" },
  { label: "AVY" },
  { label: "BHI" },
  { label: "BLL" },
  { label: "BAC" },
  { label: "BK" },
  { label: "BCR" },
  { label: "BXLT" },
  { label: "BAX" },
  { label: "BBT" },
  { label: "BDX" },
  { label: "BBBY" },
  { label: "BRK-B" },
  { label: "BBY" },
  { label: "BLX" },
  { label: "HRB" },
  { label: "BA" },
  { label: "BWA" },
  { label: "BXP" },
  { label: "BSK" },
  { label: "BMY" },
  { label: "BRCM" },
  { label: "BF-B" },
  { label: "CHRW" },
  { label: "CA" },
  { label: "CVC" },
  { label: "COG" },
  { label: "CAM" },
  { label: "CPB" },
  { label: "COF" },
  { label: "CAH" },
  { label: "HSIC" },
  { label: "KMX" },
  { label: "CCL" },
  { label: "CAT" },
  { label: "CBG" },
  { label: "CBS" },
  { label: "CELG" },
  { label: "CNP" },
  { label: "CTL" },
  { label: "CERN" },
  { label: "CF" },
  { label: "SCHW" },
  { label: "CHK" },
  { label: "CVX" },
  { label: "CMG" },
  { label: "CB" },
  { label: "CI" },
  { label: "XEC" },
  { label: "CINF" },
  { label: "CTAS" },
  { label: "CSCO" },
  { label: "C" },
  { label: "CTXS" },
  { label: "CLX" },
  { label: "CME" },
  { label: "CMS" },
  { label: "COH" },
  { label: "KO" },
  { label: "CCE" },
  { label: "CTSH" },
  { label: "CL" },
  { label: "CMCSA" },
  { label: "CMA" },
  { label: "CSC" },
  { label: "CAG" },
  { label: "COP" },
  { label: "CNX" },
  { label: "ED" },
  { label: "STZ" },
  { label: "GLW" },
  { label: "COST" },
  { label: "CCI" },
  { label: "CSX" },
  { label: "CMI" },
  { label: "CVS" },
  { label: "DHI" },
  { label: "DHR" },
  { label: "DRI" },
  { label: "DVA" },
  { label: "DE" },
  { label: "DLPH" },
  { label: "DAL" },
  { label: "XRAY" },
  { label: "DVN" },
  { label: "DO" },
  { label: "DTV" },
  { label: "DFS" },
  { label: "DISCA" },
  { label: "DISCK" },
  { label: "DG" },
  { label: "DLTR" },
  { label: "D" },
  { label: "DOV" },
  { label: "DOW" },
  { label: "DPS" },
  { label: "DTE" },
  { label: "DD" },
  { label: "DUK" },
  { label: "DNB" },
  { label: "ETFC" },
  { label: "EMN" },
  { label: "ETN" },
  { label: "EBAY" },
  { label: "ECL" },
  { label: "EIX" },
  { label: "EW" },
  { label: "EA" },
  { label: "EMC" },
  { label: "EMR" },
  { label: "ENDP" },
  { label: "ESV" },
  { label: "ETR" },
  { label: "EOG" },
  { label: "EQT" },
  { label: "EFX" },
  { label: "EQIX" },
  { label: "EQR" },
  { label: "ESS" },
  { label: "EL" },
  { label: "ES" },
  { label: "EXC" },
  { label: "EXPE" },
  { label: "EXPD" },
  { label: "ESRX" },
  { label: "XOM" },
  { label: "FFIV" },
  { label: "FB" },
  { label: "FAST" },
  { label: "FDX" },
  { label: "FIS" },
  { label: "FITB" },
  { label: "FSLR" },
  { label: "FE" },
  { label: "FSIV" },
  { label: "FLIR" },
  { label: "FLS" },
  { label: "FLR" },
  { label: "FMC" },
  { label: "FTI" },
  { label: "F" },
  { label: "FOSL" },
  { label: "BEN" },
  { label: "FCX" },
  { label: "FTR" },
  { label: "GME" },
  { label: "GPS" },
  { label: "GRMN" },
  { label: "GD" },
  { label: "GE" },
  { label: "GGP" },
  { label: "GIS" },
  { label: "GM" },
  { label: "GPC" },
  { label: "GNW" },
  { label: "GILD" },
  { label: "GS" },
  { label: "GT" },
  { label: "GOOGL" },
  { label: "GOOG" },
  { label: "GWW" },
  { label: "HAL" },
  { label: "HBI" },
  { label: "HOG" },
  { label: "HAR" },
  { label: "HRS" },
  { label: "HIG" },
  { label: "HAS" },
  { label: "HCA" },
  { label: "HCP" },
  { label: "HCN" },
  { label: "HP" },
  { label: "HES" },
  { label: "HPQ" },
  { label: "HD" },
  { label: "HON" },
  { label: "HRL" },
  { label: "HSP" },
  { label: "HST" },
  { label: "HCBK" },
  { label: "HUM" },
  { label: "HBAN" },
  { label: "ITW" },
  { label: "IR" },
  { label: "INTC" },
  { label: "ICE" },
  { label: "IBM" },
  { label: "IP" },
  { label: "IPG" },
  { label: "IFF" },
  { label: "INTU" },
  { label: "ISRG" },
  { label: "IVZ" },
  { label: "IRM" },
  { label: "JEC" },
  { label: "JBHT" },
  { label: "JNJ" },
  { label: "JCI" },
  { label: "JOY" },
  { label: "JPM" },
  { label: "JNPR" },
  { label: "KSU" },
  { label: "K" },
  { label: "KEY" },
  { label: "GMCR" },
  { label: "KMB" },
  { label: "KIM" },
  { label: "KMI" },
  { label: "KLAC" },
  { label: "KSS" },
  { label: "KRFT" },
  { label: "KR" },
  { label: "LB" },
  { label: "LLL" },
  { label: "LH" },
  { label: "LRCX" },
  { label: "LM" },
  { label: "LEG" },
  { label: "LEN" },
  { label: "LVLT" },
  { label: "LUK" },
  { label: "LLY" },
  { label: "LNC" },
  { label: "LLTC" },
  { label: "LMT" },
  { label: "L" },
  { label: "LOW" },
  { label: "LYB" },
  { label: "MTB" },
  { label: "MAC" },
  { label: "M" },
  { label: "MNK" },
  { label: "MRO" },
  { label: "MPC" },
  { label: "MAR" },
  { label: "MMC" },
  { label: "MLM" },
  { label: "MAS" },
  { label: "MA" },
  { label: "MAT" },
  { label: "MKC" },
  { label: "MCD" },
  { label: "MHFI" },
  { label: "MCK" },
  { label: "MJN" },
  { label: "MMV" },
  { label: "MDT" },
  { label: "MRK" },
  { label: "MET" },
  { label: "KORS" },
  { label: "MCHP" },
  { label: "MU" },
  { label: "MSFT" },
  { label: "MHK" },
  { label: "TAP" },
  { label: "MDLZ" },
  { label: "MON" },
  { label: "MNST" },
  { label: "MCO" },
  { label: "MS" },
  { label: "MOS" },
  { label: "MSI" },
  { label: "MUR" },
  { label: "MYL" },
  { label: "NDAQ" },
  { label: "NOV" },
  { label: "NAVI" },
  { label: "NTAP" },
  { label: "NFLX" },
  { label: "NWL" },
  { label: "NFX" },
  { label: "NEM" },
  { label: "NWSA" },
  { label: "NEE" },
  { label: "NLSN" },
  { label: "NKE" },
  { label: "NI" },
  { label: "NE" },
  { label: "NBL" },
  { label: "JWN" },
  { label: "NSC" },
  { label: "NTRS" },
  { label: "NOC" },
  { label: "NRG" },
  { label: "NUE" },
  { label: "NVDA" },
  { label: "ORLY" },
  { label: "OXY" },
  { label: "OMC" },
  { label: "OKE" },
  { label: "ORCL" },
  { label: "OI" },
  { label: "PCAR" },
  { label: "PLL" },
  { label: "PH" },
  { label: "PDCO" },
  { label: "PAYX" },
  { label: "PNR" },
  { label: "PBCT" },
  { label: "POM" },
  { label: "PEP" },
  { label: "PKI" },
  { label: "PRGO" },
  { label: "PFE" },
  { label: "PCG" },
  { label: "PM" },
  { label: "PSX" },
  { label: "PNW" },
  { label: "PXD" },
  { label: "PBI" },
  { label: "PCL" },
  { label: "PNC" },
  { label: "RL" },
  { label: "PPG" },
  { label: "PPL" },
  { label: "PX" },
  { label: "PCP" },
  { label: "PCLN" },
  { label: "PFG" },
  { label: "PG" },
  { label: "PGR" },
  { label: "PLD" },
  { label: "PRU" },
  { label: "PEG" },
  { label: "PSA" },
  { label: "PHM" },
  { label: "PVH" },
  { label: "QRVO" },
  { label: "PWR" },
  { label: "QCOM" },
  { label: "DGX" },
  { label: "RRC" },
  { label: "RTN" },
  { label: "O" },
  { label: "RHT" },
  { label: "REGN" },
  { label: "RF" },
  { label: "RSG" },
  { label: "RAI" },
  { label: "RHI" },
  { label: "ROK" },
  { label: "COL" },
  { label: "ROP" },
  { label: "ROST" },
  { label: "RLC" },
  { label: "R" },
  { label: "CRM" },
  { label: "SNDK" },
  { label: "SCG" },
  { label: "SLB" },
  { label: "SNI" },
  { label: "STX" },
  { label: "SEE" },
  { label: "SRE" },
  { label: "SHW" },
  { label: "SIAL" },
  { label: "SPG" },
  { label: "SWKS" },
  { label: "SLG" },
  { label: "SJM" },
  { label: "SNA" },
  { label: "SO" },
  { label: "LUV" },
  { label: "SWN" },
  { label: "SE" },
  { label: "STJ" },
  { label: "SWK" },
  { label: "SPLS" },
  { label: "SBUX" },
  { label: "HOT" },
  { label: "STT" },
  { label: "SRCL" },
  { label: "SYK" },
  { label: "STI" },
  { label: "SYMC" },
  { label: "SYY" },
  { label: "TROW" },
  { label: "TGT" },
  { label: "TEL" },
  { label: "TE" },
  { label: "TGNA" },
  { label: "THC" },
  { label: "TDC" },
  { label: "TSO" },
  { label: "TXN" },
  { label: "TXT" },
  { label: "HSY" },
  { label: "TRV" },
  { label: "TMO" },
  { label: "TIF" },
  { label: "TWX" },
  { label: "TWC" },
  { label: "TJK" },
  { label: "TMK" },
  { label: "TSS" },
  { label: "TSCO" },
  { label: "RIG" },
  { label: "TRIP" },
  { label: "FOXA" },
  { label: "TSN" },
  { label: "TYC" },
  { label: "UA" },
  { label: "UNP" },
  { label: "UNH" },
  { label: "UPS" },
  { label: "URI" },
  { label: "UTX" },
  { label: "UHS" },
  { label: "UNM" },
  { label: "URBN" },
  { label: "VFC" },
  { label: "VLO" },
  { label: "VAR" },
  { label: "VTR" },
  { label: "VRSN" },
  { label: "VZ" },
  { label: "VRTX" },
  { label: "VIAB" },
  { label: "V" },
  { label: "VNO" },
  { label: "VMC" },
  { label: "WMT" },
  { label: "WBA" },
  { label: "DIS" },
  { label: "WM" },
  { label: "WAT" },
  { label: "ANTM" },
  { label: "WFC" },
  { label: "WDC" },
  { label: "WU" },
  { label: "WY" },
  { label: "WHR" },
  { label: "WFM" },
  { label: "WMB" },
  { label: "WEC" },
  { label: "WYN" },
  { label: "WYNN" },
  { label: "XEL" },
  { label: "XRX" },
  { label: "XLNX" },
  { label: "XL" },
  { label: "XYL" },
  { label: "YHOO" },
  { label: "YUM" },
  { label: "ZBH" },
  { label: "ZION" },
  { label: "ZTS" }
];

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.grey["100"],
    overflow: "hidden",
    height: "100%"
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
  },
  suggestionsContainerOpen: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  suggestion: {
    display: "block"
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: "none"
  }
});

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

function renderInputComponent(inputProps) {
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
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
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
}

function getSuggestions(value) {
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
}

function getSuggestionValue(suggestion) {
  return suggestion.label;
}

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

class Reports extends Component {
  state = {
    tab: 0,
    data: [],
    search: "AAPL",
    single: "",
    popper: "",
    suggestions: []
  };

  componentDidMount() {
    getData(this.state.search).then(data => {
      this.setState({ data });
      console.log(data);
    });
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
    this.setState(
      {
        [name]: newValue,
        search: newValue
      },
      () => {
        if (this.state.search && this.state.search.length >= 1) {
          getData(this.state.search).then(data => {
            this.setState({ data });
          });
        }
      }
    );
  };

  handleTabChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value, data } = this.state;

    const autosuggestProps = {
      renderInputComponent,
      suggestions: this.state.suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
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
                    <Typography variant="h2">{this.state.search}</Typography>
                  </div>
                  <div className={classes.search}>
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
                      Price: ${data.length ? data[data.length - 1].close : ""}
                    </Typography>
                    <Typography variant="h6" style={{ marginLeft: "50px" }}>
                      Change:{" "}
                      {data.length
                        ? changePoints(
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
                        ? shortenVolume(data[data.length - 1].volume)
                        : ""}
                    </Typography>
                    <Typography variant="h6" style={{ marginLeft: "50px" }}>
                      Change %:{" "}
                      {data.length
                        ? changePercent(
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
