import React from "react";
import { fire } from "../Auth/firebaseConfig";

// Redux imports
import { connect } from "react-redux";
import { getSettings, updateSettings } from "../../actions/settingsActions.js";

// Material UI Components
import { withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { Typography, Tooltip } from "@material-ui/core";

// WithStyles
import styles from "../Styles/Settings/styles";

class OptEmailsTextsForm extends React.Component {
  componentDidMount() {
    const uid = fire.currentUser.uid;
    this.props.getSettings(uid);
  }

  handleSwitch = name => event => {
    const uid = fire.currentUser.uid;
    const switchState = { [name]: event.target.checked };
    this.props.updateSettings(uid, switchState);
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.emailTextContainer}>
        <Typography variant="h6">Email and text preferences</Typography>
        <div>
          {/* Switch for email preferences */}
          <FormControlLabel
            control={
              <Switch
                checked={this.props.settings.receiveEmails}
                onChange={this.handleSwitch("receiveEmails")}
                value="receiveEmails"
                color="secondary"
              />
            }
            label="Emails?"
            className={classes.optSwitch}
          />
          {/* Switch for text preferences */}
          <Tooltip
            disableFocusListener
            title={
              <Typography color="inherit">
                Activate the Stock Scanner, also need to enter a valid phone number to receive texts.
              </Typography>
            }
          >
            <FormControlLabel
              control={
                <Switch
                  checked={this.props.settings.receiveTexts}
                  onChange={this.handleSwitch("receiveTexts")}
                  value="receiveTexts"
                  color="secondary"
                />
              }
              label="Texts?"
              className={classes.optSwitch}
            />
          </Tooltip>
        </div>
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
  updateSettings: (uid, updatedCommPreference) =>
    dispatch(updateSettings(uid, updatedCommPreference))
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(OptEmailsTextsForm)
);
