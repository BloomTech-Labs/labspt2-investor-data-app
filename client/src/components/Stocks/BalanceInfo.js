import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import GridContainer from "../Styles/Stocks/GridContainer.jsx";
import GridItem from "../Styles/Stocks/GridItem.jsx";
import Card from "../Styles/Stocks/Card";
import styles from "../Styles/Stocks/styles";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { fire } from "../Auth/firebaseConfig";
import Button from "../Styles/Stocks/Button.jsx";
import { withStyles, Tooltip, Typography, Zoom } from "@material-ui/core";
//import withStyles from "@material-ui/core/styles/withStyles";
// core components
//import Card from "../Styles/Stocks/Card.jsx";
import CardBody from "../Styles/Stocks/CardBody.jsx";
import {
  cardTitle,
  cardLink,
  cardSubtitle
} from "../Styles/Stocks/material-kit-pro-react.jsx";

const style = {
  cardTitle,
  cardLink,
  cardSubtitle
};

//const URL = "https://pickemm.herokuapp.com/api";
const URL = "http://localhost:5000/api";

class BalanceInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeStamp: {},
      companies: ["DJI", "NDAQ", "AAPL", "AMZN"], // stock company symbols
      stocks: [],
      checked: false,
      balance: 0,
      symbol: "",
      sharesPrice: 0,
      sharesPurch: 0,
      datePurch: "",
      investment: 0,
      uid: ""
    };
  }

  componentDidMount() {
    // populate the balance card with user data from stocks table
    // get the uid of current user
    let uid = fire.currentUser.uid;
    console.log("my uid: ", uid)
    this.setState({
      uid: uid
    });
    this.fetchUserBalance(uid);
  }

  fetchUserBalance = uid => {
    axios
      .get(`${URL}/stocks`) // <----user stocks
      .then(response => {
        let stock = [];
        response.data.forEach((item, index) => {
          console.log("uid: ", item.uid)
          if (item.uid === uid) {
            stock.push(item);
          }
        
        });
        //let newBalance = item.balance;
        this.setState({
          stocks: stock
        });
        this.stockHandler();
      })
      .catch(err => {
        console.log('We"ve encountered an error');
      });
  };

  formatCurrency = num => {

   // let nbr = new Intl.NumberFormat({ style: 'currency', currency: 'USD' }).format(num);
    return num;
  };
  
  stockHandler = () => {
    let stock = [];
    if (stock) {
      this.state.stocks.map(item => {
        let newInvestment = item.sharesPurch * item.sharesPrice
        
        this.setState({
          balance: item.balance,
          sharesPurch: item.sharesPurch,
          sharesPrice: item.sharesPrice,
          investment: newInvestment
        });

        return stock.push(item);
      });
    }
    this.setState({
      companies: Array.from(new Set(stock))
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <Grid item xs={12}>
            <Card style={{ width: "80rem" }}>
              <CardBody>
                <h6 className={classes.cardTitle}>Account Balance: {this.state.balance}</h6>
                <h6 className={classes.cardSubtitle}>Shares Purchased: {this.state.sharesPurch}   Share Price:  {this.state.sharesPrice}  Total
                 Investment:  {this.state.investment}</h6>
                <p>
                  Some quick example text to build on the card title and make up the bulk of the card's content.
                </p>
                <Button color="success" size="sm" onClick={e => e.preventDefault()}>BUY</Button>
                <Button color="danger" size="sm" onClick={e => e.preventDefault()}>SELL</Button>
              </CardBody>
            </Card>
          </Grid>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(styles)(BalanceInfo);
