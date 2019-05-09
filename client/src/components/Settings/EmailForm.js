import React from "react";
import { fire } from "../Auth/firebaseConfig";

// Material UI Components
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

// WithStyles
import styles from "../Styles/Settings/styles";

class EmailForm extends React.Component {
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
      <div className={classes.emailContainer}>
        <Typography variant="h6">Email address</Typography>
        <p className={classes.currentValue}>{this.state.currentEmail}</p>
      </div>
    );
  }
}

export default withStyles(styles)(EmailForm);
