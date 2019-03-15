import React from 'react';

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


export default withStyles(styles)(OptEmailsTextsForm);