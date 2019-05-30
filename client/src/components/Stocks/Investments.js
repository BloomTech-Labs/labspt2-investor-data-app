import React from "react";
import axios from "axios";
import { Typography } from "@material-ui/core";
import InvestmentStocks from "./InvestmentStocks";
import { fire } from "../Auth/firebaseConfig";
//const URL = "https://pickemm.herokuapp.com/api";
const URL = "http://localhost:5000/api";
class Investments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeStamp: {},
      companies: [], // stock company symbols
      investments: [],
      stocks: [],
      balance: 0,
      symbol: "",
      sharesPrice: 0,
      sharesPurch: 0,
      datePurch: "",
      investment: 0,
      uid: "",
      search: ""
    };
  }

  componentDidMount() {
    let uid = fire.currentUser.uid;
    this.setState({
      uid: uid
    });
    this.fetchUserStocks(uid);
  }

  fetchUserStocks = uid => {
    axios
      .get(`${URL}/stocks`) // <----user Investments
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
        this.stockHandler();
      })
      .catch(err => {
        console.log('We"ve encountered an error');
      });
  };

  stockHandler = () => {
    let stock = [];
    if (stock) {
      this.state.stocks.map(item => {
        return stock.push(item.symbol);
      });
    }
    this.setState({
      companies: Array.from(new Set(stock))
    });
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
      <div>
        <Typography
          variant="h6"
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
        <div>
          <InvestmentStocks
            companies={this.state.companies}
            investments={this.state.investments}
          />
        </div>
      </div>
    );
  }
}

export default Investments;
