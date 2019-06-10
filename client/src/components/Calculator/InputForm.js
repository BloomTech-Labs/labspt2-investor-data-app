import React from "react";
import "../Styles/Calculator/InputForm.css";
import { fire } from "../Auth/firebaseConfig";

// Material UI Components
import { withStyles } from "@material-ui/core/styles";
//import Typography from "@material-ui/core/Typography";

// WithStyles
import styles from "../Styles/Calculator/styles";
//import Divider from '@material-ui/core/Divider';
//import { Row } from "../Styles/Calculator/InputForm";
//import Grid from "@material-ui/core/Grid";
//import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
//import People from "@material-ui/icons/People";
//core components
//import CustomInput from "../Styles/Calculator/jss/CustomInput.jsx";
//import GridItem from "../Styles/Calculator/jss/GridItem.jsx";
import Button from "../Styles/Calculator/jss/Button.jsx";

class InputForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberShares: 0,
      newPurchasePrice: 0,
      newSellPrice: 0,
      newBuyCommission: 0,
      newSellCommission: 0,
      roi: 0,
      pl: 0
    };
  }

  componentDidMount() {
    const currentEmail = fire.currentUser.email;
    this.setState({ currentEmail: currentEmail });
  }

  changeHandler = event => {
    console.log("change:", event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  };

  calculate = () => {
    //calculate the purchase price and buy commission
    let newPP = this.state.numberShares * this.state.purchasePrice;
    let newBC = newPP * (this.state.buyCommission / 100);
    newPP = newPP + newBC;
    //calculate the sell price and commission
    let newSP = this.state.numberShares * this.state.sellPrice;
    let newSC = newSP * (this.state.sellCommission / 100);
    newSP = newSP - newSC;
    //calculate the profit/loss
    let pl = newSP - newPP;
    //calculate the return on investment
    let roi = ((newSP - newPP) / newPP) * 100;
    this.setState({
      newPurchasePrice: newPP,
      newSellPrice: newSP,
      newSellCommission: newSC,
      newBuyCommission: newBC,
      pl: pl,
      roi: roi
    });
  };

  reset = () => {
    //clear all the fields or reload page.
    window.location.reload();
  };

  render() {
    //const { classes } = this.props;

    return (
      <div className="bigContainer">
        <div className="inputContainer">
          <div className="inputLeft">
            <p>Number Shares:</p>
            <p>Purchase Price: $</p>
            <p>Sell Price: $</p>
            <p>Buy Commission:   %</p>
            <p>Sell Commission:   %</p>
            <p>Capital Gains Tax Rate: %</p>

            <p> </p>
            <Button onClick={() => this.calculate()} color="primary">
              Calculate
            </Button>
          </div>

          <div className="inputRight">
            <p>
              <input
                type="text"
                onChange={this.changeHandler}
                name="numberShares"
                value={this.props.value}
                className="input1"
              />
            </p>
            <p>
              <input
                type="text"
                onChange={this.changeHandler}
                name="purchasePrice"
                value={this.props.value}
                className="input1"
              />
            </p>
            <p>
              <input 
                type="text"
                onChange={this.changeHandler}
                name="sellPrice"
                value={this.props.value}
                className="input1"
              />
            </p>
            <p>
              <input
                type="text"
                onChange={this.changeHandler}
                name="buyCommission"
                value={this.props.value}
                className="input1"
              />
            </p>
            <p>
              <input
                type="text"
                onChange={this.changeHandler}
                name="sellCommission"
                value={this.props.value}
                className="input1"
              />
            </p>
            <p>
              <input
                type="text"
                onChange={this.changeHandler}
                name="cgt"
                value={this.props.value}
                className="input1"
              />
            </p>
            <p> </p>
            <Button onClick={() => this.reset()} color="primary">
              Reset
            </Button>
          </div>
        </div>
        <div className="title">
          <h4>RESULTS</h4>
        </div>
        <div className="results">
          <div className="l">
            <p>Number Shares:</p>
            <p>Net Buy Price: $</p>
            <p>Buy Commission: $</p>
            <p>Net Sell Price: $</p>
            <p>Sell Commission: $</p>
            <p>Profit/Loss: $</p>
            <p>Return on Investment %</p>
            <p> </p>
          </div>
          <div className="r">
            <div id="number-shares-out" className="input2">
              {this.state.numberShares}
            </div>
            <p> </p>
            <div id="net-buy-price" className="input2">
              {this.state.newPurchasePrice}
            </div>
            <p> </p>
            <div id="buy-commission-out" className="input2">
              {this.state.newBuyCommission}
            </div>
            <p> </p>
            <div id="net-sell-price" className="input2">
              {this.state.newSellPrice}
            </div>
            <p> </p>
            <div id="sell-commission-out" className="input2">
              {this.state.newSellCommission}
            </div>
            <p> </p>
            <div id="pl-out" className="input2">
              {this.state.pl}
            </div>
            <p> </p>
            <div id="roi-out" className="input2">
              {this.state.roi}
            </div>
            <p> </p>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(InputForm);
