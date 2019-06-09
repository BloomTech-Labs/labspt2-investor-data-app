import React from "react";
import axios from "axios";
//import PropTypes from "prop-types";
//import Grid from "@material-ui/core/Grid";
//import Paper from "@material-ui/core/Paper";
import { Loading } from "../Styles/Stocks/LiveTickerStyles";
import GridContainer from "../Styles/Stocks/GridContainer.jsx";
import GridItem from "../Styles/Stocks/GridItem.jsx";
import Card from "../Styles/Stocks/Card";
import styles from "../Styles/Stocks/styles";
//import { Link } from "react-router-dom";
//import * as ROUTES from "../../constants/routes";
//import { fire } from "../Auth/firebaseConfig";
import Button from "../Styles/Stocks/Button.jsx";
import { withStyles, Tooltip, Typography } from "@material-ui/core";
//import withStyles from "@material-ui/core/styles/withStyles";
// core components
//import Card from "../Styles/Stocks/Card.jsx";
//import CardBody from "../Styles/Stocks/CardBody.jsx";
/* import {
  cardTitle,
  cardLink,
  cardSubtitle
} from "../Styles/Stocks/material-kit-pro-react.jsx"; */

/* const style = {
  cardTitle,
  cardLink,
  cardSubtitle
}; */

//const URL = "https://pickemm.herokuapp.com/api";
//const URL = "http://localhost:5000/api";

class BalanceInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeStamp: {},
      companies: ["DJI", "NDAQ", "AAPL", "AMZN"], // stock company symbols
      stocks: [],
      checked: false,
      balance: 0,
      symbol: "AAPL",
      sharesPrice: 0,
      sharesPurch: 0,
      datePurch: "",
      investment: 0,
      uid: this.props.uid
    };
  }

  componentDidMount() {
    if (localStorage.getItem("balanceInfo")) {
      let symbol = localStorage.getItem("balanceInfo");
      if (symbol !== "Null") {
        localStorage.setItem("balanceInfo", "Null");
        axios
          .get(
            `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&interval=5min&apikey=TFUONSVQ3ZDFXFPG`
          )
          .then(response => {
            console.log("response: ", response);
            this.fetchStocks(response.data);
          })
          .catch(err => {
            console.log('We"ve encountered an error');
          });
      }
    }
  }

  fetchStocks = results => {
    // Receives array of companies and returns values of the stock symbols from the api
    let stocks = [];
    let timeStamp;
    let data = results["Time Series (Daily)"]; //Accesses correct object within API
    let timeStamps = Object.keys(data);
    let current = data[timeStamps[0]];
    timeStamp = timeStamps[0];

    stocks.push({
      company: results["Meta Data"]["2. Symbol"], // Collects stock symbol
      values: current
    });

    this.setState({
      stocks,
      timeStamp
    });
  };

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
    if (!this.state.stocks.length) {
      // returns loading sign while data is being retrieved from API
      return <Loading>Select a Stock to load details...Reminder: this does not involve real money</Loading>;
    }
    const { classes } = this.props;
    const open = "1. open";
    const close = "4. close";
    const volume = "5. volume";
    let rows = [];

    this.state.stocks.forEach((stock, index) => {
      rows.push(
        <GridContainer key={index}>
          <GridItem xs={12} sm={3} md={6}>
            <Card>
              <Tooltip
                disableFocusListener
                title={
                  <Typography color="inherit">
                    View the Stock Indicator Reports
                  </Typography>
                }
              >
                <h2
                  style={{ position: "relative", top: "-8px" }}
                  className={classes.cardCategory}
                >
                  {stock.company}
                </h2>
              </Tooltip>
              <p
                className={classes.cardTitle}
                style={{ position: "relative", top: "12px", right: "-8px" }}
              >
                Price: ${`${this.decimalToFixed(stock.values[close])}`}
              </p>
              <p
                className={classes.cardTitle}
                style={{
                  color:
                    Math.sign(
                      this.changePoints(stock.values[close], stock.values[open])
                    ) < 0
                      ? "#ff2900"
                      : "#21ab42"
                }}
              >
                Change:{" "}
                {`${this.changePoints(
                  stock.values[close],
                  stock.values[open]
                )}`}
              </p>

              <p
                className={classes.cardTitle}
                style={{
                  position: "relative",
                  top: "12px",
                  right: "-8px"
                }}
              >
                Volume: {`${this.shortenVolume(stock.values[volume])}`}
              </p>
              <p
                className={classes.cardTitle}
                style={{
                  color:
                    Math.sign(
                      this.changePercent(
                        stock.values[close],
                        stock.values[open]
                      )
                    ) < 0
                      ? "#ff2900"
                      : "#21ab42"
                }}
              >
                Change %:{" "}
                {`${this.changePercent(
                  stock.values[close],
                  stock.values[open]
                )}`}
              </p>

              <br />
              <Button
                color="success"
                size="sm"
                onClick={() => this.buyHandler()}
              >
                Buy
              </Button>
            </Card>
          </GridItem>
        </GridContainer>
      );
    });

    return <div>{rows}</div>;
  }
}

export default withStyles(styles)(BalanceInfo);
