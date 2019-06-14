import React from "react";
import axios from "axios";
import { Typography } from "@material-ui/core";
import InvestmentStocks from "./InvestmentStocks";
import { InvestContainer, InvestHolder } from "../Styles/Stocks/Investments";
import { fire } from "../Auth/firebaseConfig";

//const URL = "https://pickemm.herokuapp.com/api";
const URL = "http://localhost:5000/api";

class Investments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: [], // stock company symbols
      investments: [],
      stocks: [],
      balance: 0,
      uid: ""
    };
  }

  componentDidMount() {
    let uid = fire.currentUser.uid;
    this.setState({
      uid: uid
    });
    // get the account balance for the user from the user table
    this.fetchBalance(uid);
  }

  fetchBalance = uid => {
    axios
      .get(`${URL}/users/${uid}`)
      .then(response => {
        let balance = response.data.balance;
        this.setState({
          balance: balance
        });
        this.fetchUserStocks(uid);
      })
      .catch(err => {
        console.log('We"ve encountered an error');
      });
  };

  // get the user stock data from the stocks table
  fetchUserStocks = uid => {
    axios
      .get(`${URL}/stocks`)
      .then(response => {
        let stock = [];
        response.data.forEach((item, index) => {
          if (item.uid === uid) {
            stock.push(item);
          }
        });
        this.setState({
          stocks: stock
        });
        // call the stock handler function
        this.stockHandler();
      })
      .catch(err => {
        console.log('We"ve encountered an error');
      });
  };

  // function that maps through the stock data so it can be displayed
  stockHandler = () => {
    let stock = [];
    // the user data is put into two different arrays to save time
    if (stock) {
      this.state.stocks.map(item => {
        return stock.push(item.symbol);
      });
    }
    this.setState({
      companies: Array.from(new Set(stock))
    });
    // if anyone wants to refactor this, be my guest. :)
    let investment = [];
    if (investment) {
      this.state.stocks.map(item => {
        return investment.push(item);
      });
    }
    this.setState({
      investments: investment
    });
  };

  render() {
    if (!this.state.companies.length) {
      return "You currently have no Investments";
    }
    return (
      <InvestContainer>
        <Typography
          variant="h5"
          gutterBottom
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          My Investment Stocks
        </Typography>
        {""}
        <InvestHolder>
          <InvestmentStocks
            companies={this.state.companies}
            investments={this.state.investments}
            balance={this.state.balance}
          />
        </InvestHolder>
      </InvestContainer>
    );
  }
}

export default Investments;
