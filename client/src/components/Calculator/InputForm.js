import React from "react";
import "../Styles/Calculator/InputForm.css";
import { fire } from "../Auth/firebaseConfig";

// Material UI Components
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

// WithStyles
import styles from "../Styles/Calculator/styles";
import { Row } from "../Styles/Calculator/InputForm";

class InputForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentEmail: ""
    };
  }

  componentDidMount() {
    const currentEmail = fire.currentUser.email;
    this.setState({ currentEmail: currentEmail });
  }

  render() {
    const { classes } = this.props;

    return (
      // <div className={classes.emailContainer}>
      <form>
        <div className="inputContainer">
          <div className="inputLeft">
          <p>Number Shares:</p>
          <p>Purchase Price: $</p>
          <p>Sell Price: $</p>
          <p>Buy Commission: %</p>
          <p>Sell Commission: %</p>
          <p>CGT Rate: %</p>
          <p>Currency: </p>
          <p> </p>
          <button onSubmit={this.submitHandler} name="calculate" className="calculator">Calculate</button>
          </div>
         
          <div className="inputRight">
         <p> <input
              type="text"
              onChange={this.inputHandler}
              name="numberShares"
              value={this.props.value}
              className="input1"
            /></p>
 <p><input
              type="text"
              onChange={this.inputHandler}
              name="purchasePrice"
              value={this.props.value}
              className="input1"
            /></p>
<p><input type="text" onChange={this.inputHandler} name="sellPrice" value={this.props.value} className="input1" /></p>
<p><input type="text" onChange={this.inputHandler} name="buyCommission" value={this.props.value} className="input1" /></p>
<p><input type="text" onChange={this.inputHandler} name="sellCommission" value={this.props.value} className="input1" /></p>
<p><input type="text" onChange={this.inputHandler} name="cgt" value={this.props.value} className="input1" /></p>
<p><input type="text" onChange={this.inputHandler} name="currency" value={this.props.value} className="input1" /></p>
<p> </p>
<button onSubmit={this.submitHandler} name="reset" className="calculator" text="Reset">Reset</button>
          </div>
     
          </div>

      </form>
    );
  }
}

export default withStyles(styles)(InputForm);
