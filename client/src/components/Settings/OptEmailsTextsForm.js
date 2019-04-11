import React from 'react';
import firebase from 'firebase';


// Redux imports
import { connect } from 'react-redux';
import { getSettings, updateSettings } from '../../actions/settingsActions.js';

// Material UI Components
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

// WithStyles
import styles from './styles';

class OptEmailsTextsForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            receiveEmails: null,
            receiveTexts: null
        }
    }

    componentDidMount(){
        const uid = firebase.auth().currentUser.uid;
        this.props.getSettings('4');
        const currentSettings = this.props.settings;
        this.setState({
            receiveEmails: currentSettings.receiveEmails,
            receiveTexts: currentSettings.receiveTexts
        });
    };

    handleSwitch = name => event => {
        event.preventDefault();
        this.setState({ [name]: event.target.checked });
        this.props.updateSettings('4', this.state);
    };

    render(){
        
        const { classes } = this.props;

        return(
            <div>
                <FormControlLabel
                    control={
                        <Switch
                            checked={this.state.receiveEmails}
                            onChange={this.handleSwitch('receiveEmails')}
                            value='receiveEmails'
                            color='primary'
                        />
                    }
                    label='Emails?'
                    className={classes.optSwitch}
                />
                <FormControlLabel
                    control={
                        <Switch
                            checked={this.state.receiveTexts}
                            onChange={this.handleSwitch('receiveTexts')}
                            value='receiveTexts'
                            color='primary'
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
    getSettings: () => dispatch(getSettings()),
    updateSettings:  (id, updatedCommPreference) => dispatch(updateSettings(id, updatedCommPreference))
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(OptEmailsTextsForm));