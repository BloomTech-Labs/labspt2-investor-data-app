import React from "react";
import axios from "axios";
import BuyModal from "./BuyModal";
import SellModal from "./SellModal";
import { private_alpha_key } from "../Auth/alphaVantageConfig";
import NumberFormat from "react-number-format";
import {
  ButtonContainer,
  Loading,
  Row,
  StocksContainer,
  StockSymbol
} from "../Styles/Stocks/InvestmentStocks";
import { Tooltip, Typography } from "@material-ui/core";
import Primary from "../Styles/Stocks/jsx/Primary.jsx";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

class InvestmentStocks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeStamp: {},
      companies: this.props.companies, // this contains all of the symbols
      investments: this.props.investments, // this is the whole stocks db or this user
      stocks: [],
      items: [],
      sharePurch: 0,
      shareCost: 0,
      sharesPurch: 0,
      sharesCost: 0,
      sharePrice: 0,
      balance: this.props.balance,
      investment: 0,
      datePurch: "",
      uid: ""
    };
  }

  componentDidMount() {
    this.fetchFavorites();
  }

  fetchFavorites = () => {
    let promises = this.state.companies.map((
      company // map that sends array of companies through axios to invoke external API
    ) =>
      axios.get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${company}&interval=5min&apikey=${private_alpha_key}`
      )
    );
    this.fetchStocks(promises);
  };

  fetchStocks = promises => {
    // Receives array of companies and returns values of the stock symbols from the api
    let stocks = [];
    let timeStamp;
    let investmentAccum = 0;
    axios
      .all(promises)
      .then(results => {
        results.forEach(result => {
          // loops through keys to access targeted values of stock(s)
          if (result.data.Note) {
            throw new Error();
          }

          let data = result.data["Time Series (Daily)"]; //Accesses correct object within API
          let timeStamps = Object.keys(data);
          let current = data[timeStamps[0]];
          timeStamp = timeStamps[0];
          // loop through the investments data to populate each card
          this.props.investments.forEach((item, index) => {
            // match the data to the symbol data
            if (item.symbol === result.data["Meta Data"]["2. Symbol"]) {
              // investmetAccum is just a rolling accumulator for money spent on stocks
              investmentAccum = investmentAccum + item.sharesCost;
              // sharesCost is the investment i have already made.
              // sharePurch is the number of shares i already purchased
              // save the id because we need it later
              stocks.push({
                company: result.data["Meta Data"]["2. Symbol"], // Collects stock symbol
                values: current,
                sharesCost: item.sharesCost,
                sharePurch: item.sharePurch,
                shareCost: item.shareCost,
                sharesPurch: item.sharesPurch,
                totalInvestment: investmentAccum,
                id: item.id
              });
            }
          });
        });
        this.setState({
          stocks,
          timeStamp,
          balance: this.props.balance
        });
      })
      .catch(error => {
        console.error("There was an error with the network requests", error);
      });
  };

  isNumeric = n => {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };

  validate = (close, start) => {
    // check for validity and if its zero, return a zero
    let dataIsValid = true;
    if ((!this.isNumeric(close)) || (!close > 0)) {
      dataIsValid = false;
    }
    // same check here
    if ((!this.isNumeric(start)) || (!start > 0)) {
      dataIsValid = false;
    }
    return dataIsValid;
  };

  changePercent = (close, start) => {
    // check for valid data
    if (this.validate(close, start)) {
      // function for calculating the change of a stocks gain/loss by %
      let deduct = close - start;
      let divide = deduct / start;
      let solution = divide * 100;
      if (solution > 0) {
        return "+" + solution.toFixed(2);
      }
      return solution.toFixed(2);
    } else {
      return 0;
    }
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
      return <Loading>Loading Stocks...</Loading>;
    }

    let rows = [];
    const close = "4. close";

    this.state.stocks.forEach((stock, index) => {
      // Loops through array of stock values and creates a table
      rows.push(
        <StocksContainer key={index}>
          <Row>
            <StockSymbol>
              <Link
                to={{
                  pathname: ROUTES.REPORTS,
                  state: { ticker: stock.company }
                }}
                key={index}
                style={{ textDecoration: "none" }}
              >
                <Primary>
                  <Tooltip
                    disableFocusListener
                    title={
                      <Typography color="inherit">
                        View Stock Indicator Reports
                      </Typography>
                    }
                  >
                    <h3>{stock.company}</h3>
                  </Tooltip>
                </Primary>
              </Link>
            </StockSymbol>
          </Row>
          <Row>
            <h5>
              <p style={{ marginLeft: "0px" }}>
                Current Shares: {stock.sharePurch}
              </p>
            </h5>
          </Row>
          <Row>
            <p>
              Price:{" "}
              <NumberFormat
                value={`${this.decimalToFixed(stock.values[close])}`}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
            </p>
            <p>
              Cost:{" "}
              <NumberFormat
                value={`${this.decimalToFixed(stock.shareCost)}`}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
            </p>
            <p
              style={{
                color:
                  Math.sign(
                    this.changePoints(stock.values[close], stock.shareCost)
                  ) < 0
                    ? "#ff2900"
                    : "#21ab42"
              }}
            >
              $
              {`${this.decimalToFixed(
                this.changePoints(stock.values[close], stock.shareCost)
              )}`}
            </p>
            <p
              style={{
                color:
                  Math.sign(
                    this.changePercent(stock.values[close], stock.shareCost)
                  ) < 0
                    ? "#ff2900"
                    : "#21ab42"
              }}
            >
              {`${this.changePercent(stock.values[close], stock.shareCost)}`}%
            </p>
          </Row>
          <Row>
            <p>
              Value:{" "}
              <NumberFormat
                value={`${this.decimalToFixed(
                  stock.values[close] * stock.sharePurch
                )}`}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
            </p>
            <p>
              Cost:{" "}
              <NumberFormat
                value={`${this.decimalToFixed(stock.sharesCost)}`}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
            </p>
            <p
              style={{
                marginLeft: "0px",
                color:
                  this.changePoints(
                    stock.values[close] * stock.sharePurch,
                    stock.sharesCost
                  ) < 0
                    ? "#ff2900"
                    : "#21ab42"
              }}
            >
              $
              {`${this.changePoints(
                stock.values[close] * stock.sharePurch,
                stock.sharesCost
              )}`}
            </p>
            <p
              style={{
                marginLeft: "0px",
                color:
                  this.changePercent(
                    stock.values[close] * stock.sharePurch,
                    stock.sharesCost
                  ) < 0
                    ? "#ff2900"
                    : "#21ab42"
              }}
            >
              {`${this.changePercent(
                stock.values[close] * stock.sharePurch,
                stock.sharesCost
              )}`}
              %
            </p>
          </Row>
          <Row>
            <ButtonContainer>
              <BuyModal
                values={stock.values[close] * stock.sharePurch}
                id={stock.id}
                company={stock.company}
                sharesCost={stock.sharesCost}
                stocks={this.state.stocks}
                sharesPurch={stock.sharesPurch}
                sharePurch={stock.sharePurch}
                shareCost={stock.shareCost}
                sharePrice={stock.values[close]}
                balance={this.state.balance}
              />
              <SellModal
                values={stock.values[close] * stock.sharePurch}
                id={stock.id}
                company={stock.company}
                sharesCost={stock.sharesCost}
                stocks={this.state.stocks}
                sharesPurch={stock.sharesPurch}
                sharePurch={stock.sharePurch}
                shareCost={stock.shareCost}
                sharePrice={stock.values[close]}
                balance={this.state.balance}
              />
            </ButtonContainer>
          </Row>
          <hr />
        </StocksContainer>
      );
    });

    return (
      <div>
        <Tooltip
          disableFocusListener
          title={
            <Typography color="inherit">
              To reset your account balance, sell all your stocks then go to the calculator and type 99999 in the Capital Gains Tax field
            </Typography>
          }
        >
          <h6>
            <p style={{ textAlign: "center" }}>
              Available Funds:
              <NumberFormat
                value={`${this.decimalToFixed(this.state.balance)}`}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
            </p>
          </h6>
        </Tooltip>
        <div>{rows}</div>
      </div>
    );
  }
}

export default InvestmentStocks;
