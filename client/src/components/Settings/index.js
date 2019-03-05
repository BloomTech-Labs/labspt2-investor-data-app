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
import PasswordForm from './PasswordForm';

class Settings extends React.Component {
    constructor(){
        super();
        this.state = {
            email: 'test@example.com',
            phone: '888-888-8888',
            newEmail: '',
            newPhone: '',
            optEmails: true,
            optTexts: true,
            oldPassword: '',
            newPassword: '',
            newPasswordConfirm: ''
        };
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
                <EmailForm 
                    handleChange={this.handleChange} 
                    email={this.state.email}
                    newEmail={this.state.newEmail}
                /> 
                {/* Form to update phone number */}
                <PhoneForm 
                    handleChange={this.handleChange}
                    phone={this.state.phone}
                    newPhone={this.state.newPhone}
                /> 
                {/* Form to opt in/out for texts and emails */}
                <OptEmailsTextsForm
                    handleSwitch={this.handleSwitch}
                    optEmails={this.state.optEmails}
                    optTexts={this.state.optTexts}
                />
                <PasswordForm 
                    oldPassword={this.state.oldPassword}
                    newPassword={this.state.newPassword}
                    newPasswordConfirm={this.state.newPasswordConfirm}
                    handleChange={this.handleChange}
                />
            </div>
        )
    };
};


export default withStyles(styles)(Settings);