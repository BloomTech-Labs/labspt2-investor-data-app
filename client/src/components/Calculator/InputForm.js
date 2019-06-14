import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "../Styles/Calculator/styles";
import NumberFormat from "react-number-format";
import {
  InputContainer,
  InputLeft,
  InputRight,
  BigContainer,
  Title,
  Results,
  Input1,
  Result
} from "../Styles/Calculator/InputForm";
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
    // remove
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
    // newBC is the new Buy Commission
    let newBC = 0;
    // newSC is the new Sell Commission
    let newSC = 0;

    // need to validate the input fields
    if (this.validate()) {
      // at this point i know all the fields have numeric values
      //calculate the purchase price and buy commission
      let newPP = this.state.numberShares * this.state.purchasePrice;
      // if the field is zero skip the calculation
      if (this.state.buyCommission > 0) {
        // calculate the buy commission
        newBC = newPP * (this.state.buyCommission / 100);
        // add the buy commission amt to the new purchase price
        newPP = newPP + newBC;
      }

      //calculate the sell price
      let newSP = this.state.numberShares * this.state.sellPrice;
      // if sell commission is a zero skip this
      if (this.state.sellCommission > 0) {
        newSC = newSP * (this.state.sellCommission / 100);
        // add the sell commission amt to the new sell price
        newSP = newSP - newSC;
      }

      //calculate the profit/loss
      let pl = newSP - newPP;
      //calculate the return on investment
      let roi = (pl / newPP) * 100;
      //calculate captial gains tax
      // make sure it is greater than zero
      if (this.state.cgt > 0) {
        let cgt = pl * (this.state.cgt / 100);
        // subtract the tax from the profit/loss
        pl = pl - cgt;
      }
      // save the new values to state
      this.setState({
        newPurchasePrice: newPP,
        newSellPrice: newSP,
        newSellCommission: newSC,
        newBuyCommission: newBC,
        pl: pl,
        roi: roi
      });
    } else {
      // kind of vague message -- does not tell user which field is bad
      alert("check for valid numeric entries");
    }
  };

  validate = () => {
    // this function check all the input fields for numeric values
    let formIsValid = true;

    if (!this.isNumeric(this.state.numberShares)) {
      formIsValid = false;
    }
    if (!this.isNumeric(this.state.purchasePrice)) {
      formIsValid = false;
    }
    if (!this.isNumeric(this.state.sellPrice)) {
      formIsValid = false;
    }
    if (!this.isNumeric(this.state.buyCommission)) {
      formIsValid = false;
    }
    if (!this.isNumeric(this.state.sellCommission)) {
      formIsValid = false;
    }
    if (!this.isNumeric(this.state.cgt)) {
      formIsValid = false;
    }
    return formIsValid;
  };

  reset = () => {
    //clear all the fields or reload page.
    // would like to clear the fields without reloading the page
    window.location.reload();
  };

  decimalToFixed = input => {
    // truncates the numbers following the decimal to two digits
    input = parseFloat(input).toFixed(2);
    return input;
  };

  render() {
    return (
      <BigContainer>
        <InputContainer>
          <InputLeft>
            <p>Number Shares:</p>
            <p>Purchase Price: $</p>
            <p>Sell Price: $</p>
            <p>Buy Commission: %</p>
            <p>Sell Commission: %</p>
            <p>Capital Gains Tax Rate: %</p>
            <p> </p>
            <Button onClick={() => this.calculate()} color="primary">
              Calculate
            </Button>
          </InputLeft>
          <InputRight>
            <p>
              <Input1
                type="text"
                onChange={this.changeHandler}
                name="numberShares"
                value={this.props.value}
                className="input1"
              />
            </p>
            <p>
              <Input1
                type="text"
                onChange={this.changeHandler}
                name="purchasePrice"
                value={this.props.value}
                className="input1"
              />
            </p>
            <p>
              <Input1
                type="text"
                onChange={this.changeHandler}
                name="sellPrice"
                value={this.props.value}
                className="input1"
              />
            </p>
            <p>
              <Input1
                type="text"
                onChange={this.changeHandler}
                name="buyCommission"
                value={this.props.value}
                className="input1"
              />
            </p>
            <p>
              <Input1
                type="text"
                onChange={this.changeHandler}
                name="sellCommission"
                value={this.props.value}
                className="input1"
              />
            </p>
            <p>
              <Input1
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
          </InputRight>
        </InputContainer>
        <Title>
          <h4>RESULTS</h4>
        </Title>
        <Results>
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
            <Result>{Number(this.state.numberShares)}</Result>
            <p> </p>
            <Result>
              <NumberFormat
                value={`${this.decimalToFixed(this.state.newPurchasePrice)}`}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
            </Result>
            <p> </p>
            <Result>
              <NumberFormat
                value={`${this.decimalToFixed(this.state.newBuyCommission)}`}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
            </Result>
            <p> </p>
            <Result>
              <NumberFormat
                value={`${this.decimalToFixed(this.state.newSellPrice)}`}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
            </Result>
            <p> </p>
            <Result>
              <NumberFormat
                value={`${this.decimalToFixed(this.state.newSellCommission)}`}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
            </Result>
            <p> </p>
            <Result>
              <NumberFormat
                value={`${this.decimalToFixed(this.state.pl)}`}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
            </Result>
            <p> </p>
            <Result>
              <NumberFormat
                value={`${this.decimalToFixed(this.state.roi)}`}
                displayType={"text"}
                thousandSeparator={true}
                prefix={""}
              />
            </Result>
            <p> </p>
          </div>
        </Results>
      </BigContainer>
    );
  }
}

export default withStyles(styles)(InputForm);
