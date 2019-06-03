import React from "react";
import axios from "axios";
import BuyModal from "./BuyModal";
import SellModal from "./SellModal";
//import { Input, Form, SearchIcon, ReturnButton } from '../Styles/Stocks/YourFavorites'
import {
  Loading,
  Row,
  TickerContainer,
  StockSymbol
} from "../Styles/Stocks/LiveTickerStyles";
import { CardBlock, ColBlock, ButtonContainer } from "../Styles/Stocks/InvestmentStocks";
//import { Tooltip, Typography } from "@material-ui/core";
import Primary from "../Styles/Stocks/jsx/Primary.jsx";
//import Button from "../Styles/Stocks/Button.jsx";
//import { Link } from "react-router-dom";
//import * as ROUTES from "../../constants/routes";

class InvestmentStocks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeStamp: {},
      companies: this.props.companies, // i know this isnt proper code
      investments: this.props.investments, // and neither is this
      stocks: [],
      items: [],
      sharePurch: 0,
      shareCost: 0,
      sharesPurch: 0,
      sharesCost: 0,
      sharePrice: 0,
      balance: 0,
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
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${company}&interval=5min&apikey=TFUONSVQ3ZDFXFPG`
      )
    );
    this.fetchStocks(promises);
  };

  fetchStocks = promises => {
    // Receives array of companies and returns values of the stock symbols from the api
    let stocks = [];
    let timeStamp;
    let sharesCost = 0;
    let investmentAccum = 0;
    let sharesPurch = 0;
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
              //investmentAccum = investmentAccum + sharesCost;
              sharesPurch = sharesPurch + item.sharePurch;
              stocks.push({
                company: result.data["Meta Data"]["2. Symbol"], // Collects stock symbol
                values: current,
                sharesCost: item.sharesCost,
                sharePurch: item.sharePurch,
                shareCost: item.shareCost,
                sharesPurch: sharesPurch
              });
            }
          });
        });

        /*  this.setState({
          balance: item.balance,
          sharesPurch: item.sharesPurch,
          sharesPrice: item.sharesPrice,
          investment: newInvestment
        }); */
        this.setState({
          stocks,
          timeStamp,
          balance: 20000 - investmentAccum
        });
        console.log("balance: ", this.state.balance)
      })
      .catch(error => {
        console.error("There was an error with the network requests", error);
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
      return <Loading>Loading Stocks...</Loading>;
    }

    let rows = [];

    const open = "1. open";
    const close = "4. close";
    const volume = "5. volume";

    this.state.stocks.forEach((stock, index) => {
      // Loops through array of stock values and creates a table
      rows.push(
        <TickerContainer key={index}>
          <Row>
            <StockSymbol>
              <p>{stock.company}</p>
            </StockSymbol>
          </Row>
          <Row>
          <h5><p style={{ marginLeft: "0px" }}> Current Shares: {stock.sharePurch}</p></h5>
          </Row>
          <Row>
            <p>Price: ${`${this.decimalToFixed(stock.values[close])}`}</p>
            <p
                  style={{
                    marginLeft: "10px"
                  }}
                >
                  Cost: ${`${this.decimalToFixed(stock.shareCost)}`}
                </p>
            
            <p
              style={{
                color:
                  Math.sign(
                    this.changePoints(stock.values[close],
                      stock.shareCost)
                  ) < 0
                    ? "#ff2900"
                    : "#21ab42"
              }}
            >
              $
              {`${this.decimalToFixed(this.changePoints(stock.values[close],
                  stock.shareCost))}`}
            </p>
            <p
              style={{
                color:
                  Math.sign(
                    this.changePercent(stock.values[close],
                      stock.shareCost)
                  ) < 0
                    ? "#ff2900"
                    : "#21ab42"
              }}
            >
                
                {`${this.changePercent(
                  stock.values[close],
                  stock.shareCost
                )}`}%
              </p>
          </Row>
          <Row>
          <p>
                Value: $
                {`${this.decimalToFixed(
                  stock.values[close] * stock.sharePurch
                )}`}
              </p>
              <p style={{ marginLeft: "0px" }}>
                  Cost: ${`${this.decimalToFixed(stock.shareCost)}`}
                </p>
                <p
              style={{
                marginLeft: "0px",
                color:
                  
                    this.changePoints(stock.values[close] * stock.sharePurch, stock.sharesCost)
                   < 0
                    ? "#ff2900"
                    : "#21ab42"
              }}
            > $
              {`${this.decimalToFixed(this.changePoints(stock.values[close] * stock.sharePurch, stock.sharesCost))}`}
                  </p>
            <p
              style={{
                marginLeft: "0px",
                color:
                 
                    this.changePercent(stock.values[close] * stock.sharePurch, stock.sharesCost)
                   < 0
                    ? "#ff2900"
                    : "#21ab42"
              }}
            >
              
              {`${this.changePercent(stock.values[close] * stock.sharePurch, stock.sharesCost)}`}%
            </p>
          </Row>
          <Row>
            <ButtonContainer>
              <BuyModal
                values={stock.values[close] * stock.sharePurch}
                company={stock.company}
                sharesCost={this.state.sharesCost}
                stocks={this.state.stocks}
                sharesPurch={stock.sharesPurch}
                sharePurch={stock.sharePurch}
                shareCost={stock.shareCost}
                sharesCost={stock.sharesCost}
                sharePrice={stock.values[close]}
              />
              <SellModal stocks={this.state.stocks} />
            </ButtonContainer>
          </Row>
          <hr />
        </TickerContainer>
      );
    });

    return (
      <div>
       <h6> <p style={{ textAlign: "center" }}>
          Available Funds: ${`${this.decimalToFixed(this.state.balance)}`}
        </p></h6>
        <div>{rows}</div>
      </div>
    );
  }
}

export default InvestmentStocks;
