import React from 'react';

// Material UI Components
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';

// WithStyles
import styles from './styles';

// Settings Page Components
import EmailForm from './EmailForm';
import PhoneForm from './PhoneForm';
import OptEmailsTextsForm from './OptEmailsTextsForm';

class Settings extends React.Component {
    constructor(){
        super();
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    handleSwitch = name => event => {
        this.setState({ [name]: event.target.checked });
    };
    
    render(){
        const { classes } = this.props;

        return(
            <div>
                <CssBaseline />
                <h2 className={classes.header}>
                        Settings
                </h2>
                {/* Form to update email address */}
                <EmailForm /> 
                {/* Form to update phone number */}
                <PhoneForm /> 
                {/* Form to opt in/out for texts and emails */}
                <OptEmailsTextsForm/>
            </div>
        )
    };
};


export default withStyles(styles)(Settings);
