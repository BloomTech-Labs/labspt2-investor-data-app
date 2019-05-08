import React from "react";
import { fire } from "../Auth/firebaseConfig";

// Redux imports
import { connect } from "react-redux";
import { getSettings, updateSettings } from "../../actions/settingsActions.js";

// Material UI Components
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

// WithStyles
import styles from "../Styles/Settings/styles";

// NumberFormat for text input
import NumberFormat from "react-number-format";

class PhoneForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: ""
    };
  }

  componentDidMount() {
    const uid = fire.currentUser.uid;
    this.props.getSettings(uid);
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const uid = fire.currentUser.uid;
    if (this.state.phoneNumber !== "") {
      this.props.updateSettings(uid, this.state);
      this.setState({
        phoneNumber: ""
      });
    }
  };

  render() {
    const { classes } = this.props;

    var phoneDisplay;

    // Display current phone number stored while loading
    if (this.props.fetchingSettings) {
      phoneDisplay = (
        <p className={classes.currentValue}>
          {this.props.settings.phoneNumber}
        </p>
      );
      // If phone number is registered, display phone number
    } else if (this.props.settings.phoneNumber) {
      phoneDisplay = (
        <p className={classes.currentValue}>
          {this.props.settings.phoneNumber}
        </p>
      );
      // If phone number is not registered, display registration instructions
    } else {
      phoneDisplay = (
        <p className={classes.currentValue}>
          To register a phone number, type yours in the box below.
        </p>
      );
    }

    return (
      <div className={classes.phoneFormContainer}>
        <div className={classes.currentPhoneContainer}>
          {/* Current phone number header */}
          <Typography variant="h6">Phone number</Typography>
          {/* Error in loading current phone number */}
          {this.props.error !== "" ? (
            <p className={classes.currentValue}>{this.props.error}</p>
          ) : null}
          {/* Display current phone number; if no number available, display instructions on how to register phone number */}
          {phoneDisplay}
        </div>
        {/* New phone number form */}
        <form
          id="phoneForm"
          onSubmit={this.handleSubmit}
          className={classes.phoneField}
        >
          {/* Text field for new phone number */}
          <NumberFormat
            name="phoneNumber"
            label="Type new phone"
            variant="outlined"
            className={classes.textField}
            value={this.state.phoneNumber}
            onChange={this.handleChange}
            margin="normal"
            inputProps={{
              style: { textAlign: "right" }
            }}
            format="+1 (###) ###-####"
            mask="_"
            customInput={TextField}
          />
          {/* Button to submit new phone number */}
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            type="submit"
            form="phoneForm"
          >
            Update phone
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    fetchingSettings: state.SettingsReducer.fetchingSettings,
    error: state.SettingsReducer.error,
    settings: state.SettingsReducer.settings
  };
};

const mapDispatchToProps = dispatch => ({
  getSettings: uid => dispatch(getSettings(uid)),
  updateSettings: (uid, updatedPhone) =>
    dispatch(updateSettings(uid, updatedPhone))
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PhoneForm)
);
