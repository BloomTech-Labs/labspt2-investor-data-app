import React from 'react';

// MATERIAL UI COMPONENTS
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'; 
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

// WITHSTYLES
import styles from './styles';

// SETTINGS PAGE COMPONENTS
import EmailForm from './EmailForm';

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
    }
    
    render(){
        const { classes } = this.props;

        return(
            <div>
                <CssBaseline />
                <h2 className={classes.header}>
                        Settings
                </h2>
                {/* FORM TO UPDATE EMAIL ADDRESS */}
                <EmailForm handleChange={this.handleChange}/> 
                {/* FORM TO UPDATE PHONE NUMBER */}
                <form 
                    className={classes.container}
                    id='phoneForm'
                >
                    <div>
                        <h3 className={classes.currentHeader}>Current phone:</h3>
                        <p className={classes.currentValue}>{this.state.phone}</p>
                    </div>
                    <TextField 
                        id='newPhone'
                        label='New phone'
                        className={classes.textField}
                        value={this.state.newPhone}
                        onChange={this.handleChange('newPhone')}
                        margin='normal'
                    />
                    <Button 
                        variant='contained' 
                        color='primary'
                        className={classes.button}
                        type='submit'
                        form='phoneForm'
                    >
                        Update phone
                    </Button>
                </form>
                {/* OPT IN/OUT FOR TEXTS AND EMAILS */}
                <FormGroup row>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={this.state.optEmails}
                                onChange={this.handleSwitch('optEmails')}
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
                                checked={this.state.optTexts}
                                onChange={this.handleSwitch('optTexts')}
                                value='optTexts'
                                color='primary'
                            />
                        }
                        label='Texts?'
                        className={classes.optSwitch}
                    />
                </FormGroup>
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