import React from "react";
import axios from "axios";
import withStyles from "@material-ui/core/styles/withStyles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import { Row, CardBlock } from "../Styles/Stocks/BuyModal";
import Close from "@material-ui/icons/Close";
import Primary from "../Styles/Stocks/jsx/Primary.jsx";
import Button from "../Styles/Stocks/jsx/Button.jsx";
import modalStyle from "../Styles/Stocks/jsx/modalStyle.jsx";
import NumberFormat from "react-number-format";
import { fire } from "../Auth/firebaseConfig";


const URL = "http://localhost:5000/api";
//const URL = "https://pickemm.herokuapp.com/api";

const style = theme => ({
  ...modalStyle(theme)
});

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class SellModal extends React.Component {
  anchorElLeft = null;
  constructor(props) {
    super(props);
    this.state = {
      openLeft: false,
      liveDemo: false,
      sharesNumber: 0,
      cost: 0,
      tempCost: 0,
      maxShares: 0,
      profit: 0,
      return: 0,
      balance: this.props.balance,
      id: "",
      uid: ""
    };
  }

  componentDidMount() {
    let Uid = fire.currentUser.uid;
    this.setState({
      id: this.props.id,
      uid: Uid
    });
    this.maxShares(this.props.sharePurch);
  }

  changeHandler = e => {
    let n = e.target.value;
    // calculate the new cost of the stocks so multiply the number of shares (n) by the current share price
    let newCost = n * this.props.sharePrice;
    // calculate the temp cost of by multiplying shares(n) by the original share cost
    let tempCost = n * this.props.shareCost; 
    // calculate the return so subtract purchase price from current price then divide by purchase price 
    let newReturn = newCost - (this.props.shareCost * n) / this.props.shareCost * n;
    //  (this.props.sharePrice * e.target.value) - (this.props.shareCost * e.target.value) / (this.props.shareCost * e.target.value);
    // divide the result by the purchase price
    //calculate the profit: new cost - original shares cost
    let profit = newCost - tempCost;
    // this is going to be this.state.sharesNumber and this.state.cost
    // these both update on screen values as the user types in a shares number
    this.setState({
      [e.target.name]: e.target.value,
      cost: newCost,
      return: newReturn,
      profit: profit,
      tempCost: tempCost
    });
  };

  sellHandler = () => {
    //check the data it cant be larger than max shares
    if (this.state.sharesNumber > this.state.maxShares) {
      alert("Shares cannot exceed the number you own...");
    } else {
      // subtract the number of shares from number shares already owned
      let newSharesNumber =
        this.props.sharePurch - Number(this.state.sharesNumber);
      
      // calculate the return on the stocks that were just sold
      // this is investment(sharesCost) minus newSharesCost
      let newReturn = newSharesNumber * this.props.sharePrice;
      // recalculate the value of shares still owned - if any
      let newSharesCost = this.props.sharesCost - newReturn;
      // calculate the new balance
      let balance = this.props.balance + newReturn;
      // update any other db values
      //let uid = this.state.uid;
      
      // make a new record using the updated data
      const newRec = {
        symbol: this.props.company,
        sharesCost: newSharesCost,
        shareCost: this.props.shareCost,
        sharePurch: newSharesNumber
        //uid: this.state.uid
      };
      // update the users stock information: need to use the real id?
      axios
        .put(`${URL}/stocks/${this.state.id}`, newRec)
        .then(response => {
          console.log("response: ", response);
          this.setState({
            sharesCost: newSharesCost,
            sharePurch: newSharesNumber,
            balance: balance
          });
          console.log("this.state: ", this.state)
        })
         
        .catch(err => {
          console.log("Error writing to stocks table");
        });
      this.balanceHandler(balance);
    }
  };

  balanceHandler = balance => {
    let test = Date.now() + 3000
    let z = 0
    do {
      z = z + 1;
    }
    while (Date.now() < test)
   
    const newRec = {
      uid: this.state.uid,
      balance: balance
    };

    axios
      .put(`${URL}/users/${this.state.uid}`, newRec)
      .then(response => {
        console.log("put response: ", response);
      })
      .catch(err => {
        console.log("error writing to users table");
      });
    if (this.state.sharePurch === 0) {
      console.log("try to delete")
      
      
      
      this.zeroStocks();
    }
    
      //window.location.reload();
  };
  // this is the number of shares already owned
  maxShares = sharePurch => {
    let estimate = sharePurch;
    this.setState({ maxShares: Number(estimate) });
  };

  zeroStocks = () => {
    // need to remove the stock from the list if the shares are equal to zero
    axios
        .delete(`${URL}/stocks/${this.state.id}`)
        .then(response => {
          //console.log("response: ", response);
          console.log("stock deleted");
        
        
        })
        .catch(err => {
          console.log('We"ve encountered an error');
        });
  }
 
  changePercent = (current, purchase) => {
    // function for calculating the change of a stocks gain/loss by %
    console.log("current: ", current)
    console.log("purchase: ", purchase)
    let deduct = current - purchase;
    let divide = deduct / purchase;
    let solution = divide * 100;
    if (solution > 0) {
      return "+" + solution.toFixed(2);
    }
    return solution.toFixed(2);
  };

  decimalToFixed = input => {
    // truncates the numbers following the decimal to two digits
    input = parseFloat(input).toFixed(2);
    return input;
  };

  handleClosePopover(state) {
    this.setState({
      [state]: false
    });
  }

  handleClickButton(state) {
    this.setState({
      [state]: true
    });
  }

  handleClickOpen(modal) {
    var x = [];
    x[modal] = true;
    this.setState(x);
  }

  handleClose(modal) {
    var x = [];
    x[modal] = false;
    this.setState(x);
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button
          color="danger"
          size="sm"
          onClick={() => this.handleClickOpen("liveDemo")}
        >
          Sell
        </Button>
        <Dialog
          classes={{
            root: classes.modalRoot,
            paper: classes.modal
          }}
          open={this.state.liveDemo}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => this.handleClose("liveDemo")}
          aria-labelledby="classic-modal-slide-title"
          aria-describedby="classic-modal-slide-description"
        >
          <CardBlock>
            <DialogTitle
              id="classic-modal-slide-title"
              disableTypography
              className={classes.modalHeader}
            >
              <Button
                simple
                className={classes.modalCloseButton}
                key="close"
                aria-label="Close"
                onClick={() => this.handleClose("liveDemo")}
              >
                {" "}
                <Close className={classes.modalClose} />
              </Button>
              <h4 className={classes.modalTitle}>Sell Shares</h4>
            </DialogTitle>
            <DialogContent
              id="classic-modal-slide-description"
              className={classes.modalBody}
            >
              <Row>
                <h3>{this.props.company}</h3>
              </Row>
              <Row>
                <Primary>
                  Currently Available Funds:{"  "}
                  <NumberFormat
                    value={`${this.decimalToFixed(this.state.balance)}`}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </Primary>
              </Row>
              <Row>
                <Primary>
                  Current Market Price:{"  "}
                  <NumberFormat
                    value={`${this.decimalToFixed(this.props.sharePrice)}`}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </Primary>
              </Row>
              <Row>
                <Primary>
                  <p>
                    Current Shares Owned: {"  "}
                    {this.props.sharePurch}
                  </p>
                </Primary>
              </Row>
              <p>
                Original Share Cost:{" "}
                <NumberFormat
                  value={`${this.decimalToFixed(this.props.shareCost)}`}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
              </p>
              <p>
                Current Investment:{" "}
                <NumberFormat
                  value={`${this.decimalToFixed(this.props.sharesCost)}`}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
              </p>
              <p>
                Current Total Value:{" "}
                <NumberFormat
                  value={`${this.decimalToFixed(this.props.values)}`}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
              </p>
              Nbr of Shares
              <form className={classes.form}>
                <input
                  type="text"
                  name="sharesNumber"
                  onChange={this.changeHandler}
                  value={this.props.value}
                  className="shares"
                />
                <p>
                  Max Shares: {"  "}
                  {`${this.state.maxShares}`}
                </p>
                <p>
                  Est. Profit: 
                  <NumberFormat
                    value={`${this.decimalToFixed(this.state.profit)}`}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </p>
                <p>
                  Est. Value:{" "}
                  <NumberFormat
                    value={`${this.decimalToFixed(this.state.cost)}`}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </p>
                <Row>
                <p>Est. Return:{" "}
                 
                </p>
                <p
              style={{
                color:
                  Math.sign(this.state.return) < 0
                    ? "#ff2900"
                    : "#21ab42"
              }}
            >
              {`${this.changePercent(this.state.cost, this.state.tempCost)}`}%
            </p></Row>
              </form>
              <hr />
            </DialogContent>
            <DialogActions className={classes.modalFooter}>
              <Button
                onClick={() => this.handleClose("liveDemo")}
                color="secondary"
              >
                Cancel
              </Button>
              <Button onClick={() => this.sellHandler()} color="danger">
                Sell
              </Button>
            </DialogActions>
          </CardBlock>
        </Dialog>
       
      </div>
    );
  }
}

export default withStyles(style)(SellModal);