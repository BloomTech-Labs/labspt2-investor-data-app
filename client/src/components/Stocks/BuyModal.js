import React from "react";
import axios from "axios";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
//import Tooltip from "@material-ui/core/Tooltip";
import InputAdornment from "@material-ui/core/InputAdornment";
//import FormControlLabel from "@material-ui/core/FormControlLabel";
//import Icon from "@material-ui/core/Icon";
//import Face from "@material-ui/icons/Face";
//import Email from "@material-ui/icons/Email";
//import Popover from "@material-ui/core/Popover";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
// core components
import Primary from "../Styles/Stocks/jsx/Primary.jsx";
import Button from "../Styles/Stocks/jsx/Button.jsx";
import CustomInput from "../Styles/Stocks/jsx/CustomInput.jsx";
import modalStyle from "../Styles/Stocks/jsx/modalStyle.jsx";
import popoverStyles from "../Styles/Stocks/jsx/popoverStyles.jsx";
//import Check from "@material-ui/icons/Check";
import NumberFormat from "react-number-format";
import tooltipsStyle from "../Styles/Stocks/jsx/tooltipsStyle.jsx";
import { fire } from "../Auth/firebaseConfig";
//import javascriptStyles from "../Styles/Stocks/jsx/javascriptStyles.jsx";

const URL = "http://localhost:5000/api";
//const URL = "https://pickemm.herokuapp.com/api";

const style = theme => ({
  ...modalStyle(theme),
  ...popoverStyles,
  ...tooltipsStyle
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
      uid: ""
    };
  }

  componentDidMount() {
    let uid = fire.currentUser.uid;
    this.setState({
      uid: uid
    });
    this.maxShares(this.props.balance, this.props.price);
  }

  changeHandler = e => {
    let newCost = e.target.value * this.props.price;
    // this.setState(() => ({ [name]: target.value, cost: newCost }));

    this.setState({ [e.target.name]: e.target.value, cost: newCost });
    console.log("e.target.value: ", e.target.value);
  };

  buyHandler = () => {
    //check the data
    let newSharesNumber = this.state.sharesNumber + this.props.sharesPurch;
    let newSharesPrice = this.state.cost;
    let newBalance = this.props.balance - newSharesPrice;
    let newInvestment = this.props.investment + this.state.cost;
    let uid = this.state.uid;

    const newRec = {
      symbol: this.state.symbol,
      balance: newBalance,
      sharesPrice: this.state.cost,
      sharesPurch: newSharesNumber,
      uid: this.state.uid
    };
    //get the uid  and do a update to the stocks table
    axios
      .put(`${URL}/stocks/${uid}`, newRec)
      .then(response => {
        console.log("response: ", response);
      })
      .catch(err => {
        console.log('We"ve encountered an error');
      });
  };
  //save it to the database

  //update the rest of the values

  maxShares = (balance, price) => {
    //let newCost = this.props.values;
    // calculate the most stocks you can buy
    //   with the funds available using the
    //   current stock price
    let estimate = balance / price;
    estimate.toLocaleString(undefined, {maximumFractionDigits:2})
    //return estimate.toLocaleString(navigator.language, { minimumFractionDigits: 0 });
    console.log("estimate: ", estimate);
    this.setState({ maxShares: estimate });
    //return estimate;
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
            <h4>{this.props.company}</h4>
            <Primary>
              <h5>
                Available Funds: {" "}
                <NumberFormat
                  value={`${this.decimalToFixed(this.props.balance)}`}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                /> {" "}
              </h5>
            </Primary>
             <Primary>
              
                <h5>
                  Current Market Price: {" "}
                  <NumberFormat
                    value={`${this.decimalToFixed(this.props.price)}`}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
              </h5>
            </Primary>
            <Primary>
              <h5>Current Shares Owned: {" "} {this.props.sharesPurch}</h5>
            </Primary>
            <p>
              Original Share Cost:  {" "}<NumberFormat
                    value={`${this.decimalToFixed(this.props.sharesPrice)}`}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
            </p>
            <p>
              Current Investment: {" "}<NumberFormat
                    value={`${this.decimalToFixed(this.props.investment)}`}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
            </p>
            <p>
              Current Total Value: {" "}<NumberFormat
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
              <CustomInput
                type="text"
                onChange={this.changeHandler}
                value={this.props.value}
                name="sharesNumber"
                formControlProps={{
                  fullWidth: false,
                  className: classes.customFormControlClasses
                }}
                inputProps={{
                  startAdornment: (
                    <InputAdornment
                      type="text"
                      onChange={this.changeHandler}
                      name="sharesNumber"
                      value={this.props.value}
                      position="start"
                      className={classes.inputAdornment}
                    >
                      <i className="material-icons">create</i>
                    </InputAdornment>
                  ),
                  placeholder: "Shares"
                }}
              />
             <p>Max Shares: 
                {`${this.decimalToFixed(this.state.maxShares)}`}
               </p>
             <p>
                Market Price: x <NumberFormat
                  value={`${this.decimalToFixed(this.props.price)}`}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
              </p>
              <p>Est. Cost: {" "} <NumberFormat
                  value={`${this.decimalToFixed(this.state.cost)}`}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                /> </p>
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
            <Button onClick={() => this.buyHandler()} color="primary">Buy</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(style)(BuyModal);
