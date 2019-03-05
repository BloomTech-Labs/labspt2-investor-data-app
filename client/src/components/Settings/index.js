import React from 'react';

// Material UI Components
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'; 
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

// WithStyles
import styles from './styles';

// Settings Page Components
import EmailForm from './EmailForm';
import PhoneForm from './PhoneForm';
import OptEmailsTextsForm from './OptEmailsTextsForm'

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
        console.log(this.state)
    };

    handleSwitch = name => event => {
        this.setState({ [name]: event.target.checked });
        console.log(this.state)
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
                <form 
                    className={classes.container}
                    id='passwordForm'
                >
                    <TextField 
                        id='oldPassword'
                        label='Old password'
                        className={classes.textField}
                        value={this.state.oldPassword}
                        onChange={this.handleChange('oldPassword')}
                        margin='normal'
                        type='password'
                    />
                    <TextField 
                        id='newPassword'
                        label='New password'
                        className={classes.textField}
                        value={this.state.newPassword}
                        onChange={this.handleChange('newPassword')}
                        margin='normal'
                        type='password'
                    />
                    <TextField 
                        id='newPasswordConfirm'
                        label='Confirm new password'
                        className={classes.textField}
                        value={this.state.newPasswordConfirm}
                        onChange={this.handleChange('newPasswordConfirm')}
                        margin='normal'
                        type='password'
                    />
                    <Button 
                        variant='contained' 
                        color='primary'
                        className={classes.button}
                        type='submit'
                        form='passwordForm'
                    >
                        Update password
                    </Button>
                </form>
            </div>
        )
    };
};


export default withStyles(styles)(Settings);