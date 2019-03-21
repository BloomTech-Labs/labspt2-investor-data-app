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
    
    render(){
        
        const { classes } = this.props;

        return(
            <FormGroup row>
                <FormControlLabel
                    control={
                        <Switch
                            checked={this.props.optEmails}
                            onChange={this.props.handleSwitch('optEmails')}
                            value='optEmails'
                            color='primary'
                        />
                    }
                    label='Emails?'
                    className={classes.optSwitch}
                />
                <FormControlLabel
                    control={
                        <Switch
                            checked={this.props.optTexts}
                            onChange={this.props.handleSwitch('optTexts')}
                            value='optTexts'
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
    updateSettings:  (id, updatedEmail) => dispatch(updateSettings(id, updatedEmail))
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(OptEmailsTextsForm));