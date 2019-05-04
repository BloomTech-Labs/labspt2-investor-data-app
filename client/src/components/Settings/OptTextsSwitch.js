import React from 'react';
import firebase from 'firebase';

// Redux imports
import { connect } from 'react-redux';
import { getSettings, updateSettings } from '../../actions/settingsActions.js';

// Material UI Components
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Typography from "@material-ui/core/Typography";

// WithStyles
import styles from '../Styles/Settings/styles';

class OptTextsSwitch extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            receiveTexts: this.props.settings.receiveTexts
        };
    };

    componentDidMount(){
        const uid = firebase.auth().currentUser.uid;
        this.props.getSettings(uid);
    };

    handleSwitch = name => event => {
        const uid = firebase.auth().currentUser.uid;
        this.setState({[name]: event.target.checked}, () => {
            this.props.updateSettings(uid, this.state);
        });
    };

    render() {
        
        const { classes } = this.props;

        return(
            <div className={classes.emailTextContainer}>
                <Typography variant='h6'>Text preference</Typography>
                <div>
                    {/* Switch for text preferences */}
                    <FormControlLabel
                        control={
                            <Switch
                                checked={this.props.settings.receiveTexts}
                                onChange={this.handleSwitch('receiveTexts')}
                                value='receiveTexts'
                                color='secondary'
                            />
                        }
                        label='Receive updates by text.'
                        labelPlacement='start'
                        className={classes.optSwitch}
                    />
                </div>
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

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(OptTextsSwitch));