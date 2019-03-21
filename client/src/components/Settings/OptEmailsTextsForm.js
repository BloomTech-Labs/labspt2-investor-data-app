import React from 'react';

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
            receiveEmails: true,
            receiveTexts: true
        }
    }

    componentDidMount(){
        this.props.getSettings();
    };

    handleSwitch = name => event => {
        event.preventDefault();
        this.setState({ [name]: event.target.checked });
        this.props.updateSettings('1', this.state);
    };

    render(){
        
        const { classes } = this.props;

        return(
            <FormGroup row>
                <FormControlLabel
                    control={
                        <Switch
                            checked={this.props.settings.receiveEmails}
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
                            checked={this.props.settings.receiveTexts}
                            onChange={this.handleSwitch('receiveTexts')}
                            value='receiveTexts'
                            color='primary'
                        />
                    }
                    label='Texts?'
                    className={classes.optSwitch}
                />
            </FormGroup>
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