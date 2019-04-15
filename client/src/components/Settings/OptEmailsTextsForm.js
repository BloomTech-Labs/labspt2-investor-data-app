import React from 'react';
import firebase from 'firebase';


// Redux imports
import { connect } from 'react-redux';
import { getSettings, updateSettings } from '../../actions/settingsActions.js';

// Material UI Components
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

// WithStyles
import styles from './styles';

class OptEmailsTextsForm extends React.Component {
    constructor(props){
        super(props);
    };

    componentDidMount(){
        const uid = firebase.auth().currentUser.uid;
        this.props.getSettings(uid);
    };

    handleSwitch = name => event => {
        const uid = firebase.auth().currentUser.uid;
        const switchState = { [name]: event.target.checked };
        this.props.updateSettings(uid, switchState);
    };

    render(){
        
        const { classes } = this.props;

        return(
            <div>
                <FormControlLabel
                    control={
                        <Switch
                            checked={this.props.settings.receiveEmails}
                            onChange={this.handleSwitch('receiveEmails')}
                            value='receiveEmails'
                            color='secondary'
                        />
                    }
                    label='Emails?'
                    className={classes.optSwitch}
                />
                <FormControlLabel
                    control={
                        <Switch
                            checked={this.props.settings.receiveTexts}
                            onChange={this.handleSwitch('receiveTexts')}
                            value='receiveTexts'
                            color='secondary'
                        />
                    }
                    label='Texts?'
                    className={classes.optSwitch}
                />
            </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        fetchingSettings: state.SettingsReducer.fetchingSettings,
        error: state.SettingsReducer.error,
        settings: state.SettingsReducer.settings
    }
};

const mapDispatchToProps = dispatch => ({
    getSettings: (uid) => dispatch(getSettings(uid)),
    updateSettings:  (uid, updatedCommPreference) => dispatch(updateSettings(uid, updatedCommPreference))
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(OptEmailsTextsForm));