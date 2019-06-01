import React from "react";
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
import Button from "../Styles/Stocks/jsx/Button.jsx";
import CustomInput from "../Styles/Stocks/jsx/CustomInput.jsx";
import modalStyle from "../Styles/Stocks/jsx/modalStyle.jsx";
import popoverStyles from "../Styles/Stocks/jsx/popoverStyles.jsx";
//import Check from "@material-ui/icons/Check";
import tooltipsStyle from "../Styles/Stocks/jsx/tooltipsStyle.jsx";
//import javascriptStyles from "../Styles/Stocks/jsx/javascriptStyles.jsx";

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
      cost: 0
    };
  }

  changeHandler = e => {
    let newCost = e.target.value * this.props.price;
   // this.setState(() => ({ [name]: target.value, cost: newCost }));

    this.setState({ [e.target.name]: e.target.value, cost: newCost });
    console.log("e.target.value: ", e.target.value);
  };

  handleChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.log("value:", value);
    console.log("name:", name);
    console.log("target:", target);
    /*  this.setState({
       [name]: value
     
     }); */
    //let newCost = e.target.value * this.props.price;
   // this.setState(() => ({ [name]: target.value, cost: newCost }));

   // console.log("shares number:", this.state.sharesNumber);
  };

  //handleChange = name => event => {
  //  setValues({ ...values, [name]: event.target.value });
  //};

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
            <h5>Available Funds: ${`${this.decimalToFixed(this.props.balance)}`}</h5>
            <p>
              Current Market Price: $
              {`${this.decimalToFixed(this.props.price)}`}
            </p>
            <p>Current Shares Owned: {this.props.sharesPurch}</p>
            <p>Original Share Cost:  $
              {`${this.decimalToFixed(this.props.sharesPrice)}`}</p>
            <p>
              Current Investment: $
              {`${this.decimalToFixed(this.props.investment)}`}
            </p>
            <p>Current Total Value:  $
              {`${this.decimalToFixed(this.props.values)}`} </p>
            Stocks to Buy
            <form className={classes.form}>
             <input type="text" name="sharesNumber" onChange={this.changeHandler}
               value={this.props.value} className="shares" />
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
              <p>
                Market Price: x $
                {`${this.decimalToFixed(this.props.price)}`}
              </p>
              <p>Est. Cost: ${`${this.decimalToFixed(this.state.cost)}`} </p>
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
            <Button color="primary">Buy</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(style)(BuyModal);
