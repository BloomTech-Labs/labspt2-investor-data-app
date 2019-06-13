import React from "react";
import "../Styles/Calculator/InputForm.css";
//import { fire } from "../Auth/firebaseConfig";

// Material UI Components
import { withStyles } from "@material-ui/core/styles";
//import Typography from "@material-ui/core/Typography";

// WithStyles
import styles from "../Styles/Calculator/styles";
import NumberFormat from "react-number-format";
//import Divider from '@material-ui/core/Divider';
import { InputContainer, InputLeft, InputRight, BigContainer, Title, Results, Input1 } from "../Styles/Calculator/InputForm";
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
     // fields: {},
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
    //this.setState({ currentEmail: currentEmail });
  }

  changeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  isNumeric = n => {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };

  calculate = () => {
    let newBC = 0;
    let newSC = 0;
    
    if (this.validate()) {
      //calculate the purchase price and buy commission
      let newPP =
        this.state.numberShares * this.state.purchasePrice;

      // if the field is empty
     /*  if (!fields["buyCommission"]) {
        newBC = 0;
      } else { */
        newBC = newPP * (this.state.buyCommission / 100);
      //}
     // newPP = newPP + newBC;

      //calculate the sell price and sell commission
      let newSP = this.state.numberShares * this.state.sellPrice;

      // if the field is empty
     /*  if (!fields["sellCommission"]) {
        newSC = 0;
      } else { */
        newSC = newSP * (this.state.sellCommission / 100);
      //}
      //newSP = newSP - newSC;

      //calculate the profit/loss
      let pl = newSP - newPP;
      //calculate the return on investment
      let roi = ((newSP - newPP) / newPP) * 100;
      //calculate captial gains tax
     /*  let cgt = 0;
      if (pl > 0) {
        cgt = pl * (this.state.cgt / 100);
        pl = pl - cgt;
      } */

      this.setState({
        newPurchasePrice: newPP,
        newSellPrice: newSP,
        newSellCommission: newSC,
        newBuyCommission: newBC,
        pl: pl,
        roi: roi
      });
    } else {
      alert("check for valid numeric entries");
    }
  };

  validate = () => {
    let formIsValid = true;

    if (!this.isNumeric(this.state.numberShares)) {
      formIsValid = false;
      //console.log("shares: ", this.state.numberShares)
    }
    if (!this.isNumeric(this.state.purchasePrice)) {
      formIsValid = false;
      //console.log("pp: ", this.state.purchasePrice)
    }
    if (!this.isNumeric(this.state.sellPrice)) {
      formIsValid = false;
      //console.log("sp: ", this.state.sellPrice)
    }
    if (!this.isNumeric(this.state.buyCommission)) {
      formIsValid = false;
      //console.log("bc: ", this.state.buyCommission)
    }
    if (!this.isNumeric(this.state.sellCommission)) {
      formIsValid = false;
      // console.log("sc: ", this.state.sellCommission)
    }
    if (!this.isNumeric(this.state.cgt)) {
      formIsValid = false;
      //console.log("cgt: ", this.state.cgt)
    }
    return formIsValid;
  };

  reset = () => {
    //clear all the fields or reload page.
    window.location.reload();
  };

  decimalToFixed = input => {
    // truncates the numbers following the decimal to two digits
    input = parseFloat(input).toFixed(2);
    return input;
  };

  render() {
    //const { classes } = this.props;

    return (
      <BigContainer>
        {/* <div className="bigContainer"> */}
        <InputContainer>
          {/*  <div className="inputContainer"> */}
          <InputLeft>
            {/* <div className="inputLeft"> */}
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
          </InputLeft>
          <InputRight>
          {/*  <div className="inputRight"> */}
            <p>
              <input
                type="text"
                onChange={this.changeHandler}
                name="numberShares"
                value={this.props.value}
               // value={this.state.numberShares}
                className="input1"
              />
            </p>
            <p>
              <input
                type="text"
                onChange={this.changeHandler}
                name="purchasePrice"
                value={this.props.value}
               // value={this.state.purchasePrice}
                className="input1"
              />
            </p>
            <p>
              <input
                type="text"
                onChange={this.changeHandler}
                name="sellPrice"
               // value={this.state.sellPrice}
                value={this.props.value}
                className="input1"
              />
            </p>
            <p>
              <input
                type="text"
                onChange={this.changeHandler}
                name="buyCommission"
                //value={this.state.buyCommission}
                value={this.props.value}
                className="input1"
              />
            </p>
            <p>
              <input
                type="text"
                onChange={this.changeHandler}
                name="sellCommission"
                //value={this.state.sellCommission}
                value={this.props.value}
                className="input1"
              />
            </p>
            <p>
              <input
                type="text"
                onChange={this.changeHandler}
                name="cgt"
                //value={this.state.cgt}
                value={this.props.value}
                className="input1"
              />
            </p>
            <p> </p>
            <Button onClick={() => this.reset()} color="primary">
              Reset
            </Button>
          </InputRight>
        </InputContainer>
        <Title>
          {/*  <div className="title"> */}
          <h4>RESULTS</h4>
        </Title>
        <Results>
          {/* <div className="results"> */}
          <div className="l">
            <p>Number Shares:</p>
            <p>Net Buy Price: </p>
            <p>Buy Commission: </p>
            <p>Net Sell Price: </p>
            <p>Sell Commission: </p>
            <p>Profit/Loss: </p>
            <p>Return on Investment %</p>
            <p> </p>
          </div>
          <div className="r">
            <div id="number-shares-out" className="input2">
              {Number(this.state.numberShares)}
            </div>
            <p> </p>
            <div id="net-buy-price" className="input2">
              <NumberFormat
                value={`${this.decimalToFixed(this.state.newPurchasePrice)}`}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
            </div>
            <p> </p>
            <div id="buy-commission-out" className="input2">
            <NumberFormat
                    value={`${this.decimalToFixed(this.state.newBuyCommission)}`}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />  
            </div>
            <p> </p>
            <div id="net-sell-price" className="input2">
            <NumberFormat
                    value={`${this.decimalToFixed(this.state.newSellPrice)}`}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  /> 
            </div>
            <p> </p>
            <div id="sell-commission-out" className="input2">
            <NumberFormat
                    value={`${this.decimalToFixed(this.state.newSellCommission)}`}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  /> 
            </div>
            <p> </p>
            <div id="pl-out" className="input2">
            <NumberFormat
                    value={`${this.decimalToFixed(this.state.pl)}`}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  /> 
            </div>
            <p> </p>
            <div id="roi-out" className="input2">
            <NumberFormat
                    value={`${this.decimalToFixed(this.state.roi)}`}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={""}
                  /> 
            </div>
            <p> </p>
          </div>
        </Results>
      </BigContainer>
    );
  }
}

export default withStyles(styles)(InputForm);
