import React from "react";
import axios from "axios";
import { private_alpha_key } from "../Auth/alphaVantageConfig";
import { Loading } from "../Styles/Stocks/BalanceInfo";
import GridContainer from "../Styles/Stocks/jsx/GridContainer.jsx";
import GridItem from "../Styles/Stocks/jsx/GridItem.jsx";
import Card from "../Styles/Stocks/jsx/Card";
import styles from "../Styles/Stocks/styles";
import Button from "../Styles/Stocks/jsx/Button.jsx";
import { withStyles, Tooltip, Typography } from "@material-ui/core";

//const URL = "https://pickemm.herokuapp.com/api";
const URL = "http://localhost:5000/api";

class BalanceInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeStamp: {},
      stocks: [],
      checked: false,
      balance: 0,
      symbol: "",
      sharesPrice: 0,
      sharesPurch: 0,
      datePurch: "",
      investment: 0,
      uid: this.props.uid
    };
  }

  componentDidMount() {
    // not happy with this code but it works, its prohibits the card from constantly displaying
    if (localStorage.getItem("balanceInfo")) {
      // check the contents of local storage
      let symbol = localStorage.getItem("balanceInfo");
      // if its not equal to null then fetch the stock data
      if (symbol !== "null") {
        localStorage.setItem("balanceInfo", "null");
        // set it to null to prevent it from reopening and save symbol to state
        this.setState({
          symbol: symbol
        });
        axios
          .get(
            `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&interval=5min&apikey=${private_alpha_key}`
          )
          .then(response => {
            this.fetchStocks(response.data);
          })
          .catch(err => {
            console.log('We"ve encountered an error fetching stock data');
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
    // build an object with the stock data
    stocks.push({
      company: results["Meta Data"]["2. Symbol"], // Collects stock symbol
      values: current
    });

    this.setState({
      stocks,
      timeStamp
    });
  };
  // user has decided they want to buy/sell using this symbol
  buyHandler = () => {
    // i need to check for duplicates before saving a new record

    // make a new record using the updated data
    const newRec = {
      symbol: this.state.symbol,
      sharesCost: 0,
      shareCost: 0,
      sharePurch: 0,
      uid: this.state.uid,
      datePurch: ""
    };
    axios
      .post(`${URL}/stocks`, newRec)
      .then(response => {
        //console.log("response: ", response);
      })
      .catch(err => {
        console.log("error writing to stocks table");
      });
    // need to figure another way to refresh the investment display
    window.location.reload();
  };

  // user decided to cancel the whole process
  cancelHandler = () => {
    // clear out our storage area
    localStorage.setItem("balanceInfo", null);
    // um... reload
    window.location.reload();
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
          <GridItem xs={12} sm={6} md={3}>
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
                List Em
              </Button>
              <Button
                color="danger"
                size="sm"
                onClick={() => this.cancelHandler()}
              >
                Cancel
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
