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

class BuyModal extends React.Component {
  anchorElLeft = null;
  constructor(props) {
    super(props);

    this.state = {
      openLeft: false,
      liveDemo: false,
      sharesNumber: 0,
      cost: 0,
      maxShares: 0,
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
    this.maxShares(this.state.balance, this.props.sharePrice);
  }

  isNumeric = n => {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };

  validate = target => {
    // this function check all the input fields for numeric values
    let formIsValid = false;

    if (!this.isNumeric(target)) {
      formIsValid = true;
    }
    return formIsValid;
  };

  changeHandler = e => {
    console.log("i am here: ");
    // check the validity of the data
    if (!this.validate(e.target.value)) {
      console.log("target: ", e.target.value);
      // calculate the new cost of the stocks
      let newCost = e.target.value * this.props.sharePrice;

      this.setState({
        [e.target.name]: e.target.value,
        cost: newCost
      });
    } else {
      alert("Please enter a numeric value");
    }
  };

  buyHandler = () => {
    //check the data it cant be larger than max shares
    if (this.state.sharesNumber > this.state.maxShares) {
      alert("Shares must be less than max shares...");
    } else {
      // add the number of new shares purchased to old shares purchased
      let newSharesNumber = Number(this.state.sharesNumber) + this.props.sharePurch;
      // add the new investment to the old investment total
      let newSharesCost = this.props.sharesCost + this.state.cost;
      // calculate the new share cost
      let newShareCost = newSharesCost / newSharesNumber;
      // calculate the new user balance
      let balance = this.props.balance - this.state.cost;

      // make a new record using the updated data
      const newRec = {
        symbol: this.props.company,
        sharesCost: newSharesCost,
        shareCost: newShareCost,
        sharePurch: newSharesNumber,
        uid: this.state.uid
      };

      // update the users stock information: need to use the real id
      axios
        .put(`${URL}/stocks/${this.state.id}`, newRec)
        .then(response => {
          //console.log("response: ", response);

         // this.setState({
            //sharesCost: this.props.id,
         //   sharesCost: newSharesCost,
         //   sharePurch: newSharesNumber,
         //   balance: balance
         // });
        })
        .catch(err => {
          console.log("error writing to stocks table");
        });
      this.balanceHandler(balance);
    }
  };

  balanceHandler = balance => {
    // update the users balance located in the users table
    const newRec = {
      uid: this.state.uid,
      balance: balance
    };

    axios
      .put(`${URL}/users/${this.state.uid}`, newRec)
      .then(response => {
        //console.log("put response: ", response);
        this.handleClose("liveDemo");
      })
      .catch(err => {
        console.log("error writing to users table");
      });

    window.location.reload();
  };

  // calculate the max number of stocks you can buy with available funds
  maxShares = (balance, price) => {
    // divide the balance by the price to get the estimated cost.
    let estimate = balance / price;
    // format the estimate to just whole numbers.
    estimate = estimate.toString();
    // make the next two lines into one line of code..
    let n = estimate.indexOf(".");
    estimate = estimate.slice(0, n);

    //save max shares to state
    this.setState({
      maxShares: Number(estimate)
    });
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
    const {classes} = this.props;
    return (
      <div>
        <Button
          color="success"
          size="sm"
          onClick={() => this.handleClickOpen("liveDemo")}
        >
          Buy
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
              <h4 className={classes.modalTitle}>Buy Stock Shares</h4>
            </DialogTitle>
            <DialogContent
              id="classic-modal-slide-description"
              className={classes.modalBody}
            >
              <Row>
                <Primary>
                  <h3> {this.props.company}</h3>
                </Primary>
              </Row>
              <Row>
                <Primary>
                  Currently Available Funds:
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
                  Current Market Price:{" "}
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
              <Row>
                Original Share Cost:{" "}
                <NumberFormat
                  value={`${this.decimalToFixed(this.props.shareCost)}`}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
               </Row>
               <Row>
                Current Investment:{" "}
                <NumberFormat
                  value={`${this.decimalToFixed(this.props.sharesCost)}`}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
              </Row>
              <Row>
                Current Total Value:{" "}
                <NumberFormat
                  value={`${this.decimalToFixed(this.props.values)}`}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
              </Row>
              <Row>
              Nbr of Shares
              </Row>
              <form className={classes.form}>
                <input
                  type="text"
                  name="sharesNumber"
                  onChange={this.changeHandler}
                  value={this.props.value}
                  className="shares"
                />
                <Row>
                  Max Shares: {"  "}
                  {`${this.state.maxShares}`}
                  </Row>
                <Row>
                  Market Price: x
                  <NumberFormat
                    value={`${this.decimalToFixed(this.props.sharePrice)}`}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </Row>
                <Row>
                  Est. Cost:{" "}
                  <NumberFormat
                    value={`${this.decimalToFixed(this.state.cost)}`}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
               </Row>
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
              <Button onClick={() => this.buyHandler()} color="success">
                Buy
              </Button>
            </DialogActions>
          </CardBlock>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(style)(BuyModal);