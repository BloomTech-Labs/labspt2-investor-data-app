import React, { Component } from "react";
import * as ROUTES from "../../constants/routes";
import { Link } from "react-router-dom";
import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

class ThankYou extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.parent}>
        <h2>Thank you!</h2>
        <p>Where would you like to go to?</p>
        <Link to={ROUTES.SETTINGS}>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
          >
            Settings
          </Button>
          <div />
        </Link>
        <Link to={ROUTES.DASHBOARD}>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
          >
            Dashboard
          </Button>
        </Link>
      </div>
    );
  }
}
export default withStyles(styles)(ThankYou);
