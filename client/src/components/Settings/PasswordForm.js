import React from 'react';

// Material UI Components
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'; 
import Button from '@material-ui/core/Button';

// WithStyles
import styles from './styles';

class PasswordForm extends React.Component {
    constructor(){
        super();
    };

    render(){


        const { classes } = this.props;

        return(
            <form 
                className={classes.container}
                id='passwordForm'
            >
                <TextField 
                    id='oldPassword'
                    label='Old password'
                    className={classes.textField}
                    value={this.props.oldPassword}
                    onChange={this.props.handleChange('oldPassword')}
                    margin='normal'
                    type='password'
                />
                <TextField 
                    id='newPassword'
                    label='New password'
                    className={classes.textField}
                    value={this.props.newPassword}
                    onChange={this.props.handleChange('newPassword')}
                    margin='normal'
                    type='password'
                />
                <TextField 
                    id='newPasswordConfirm'
                    label='Confirm new password'
                    className={classes.textField}
                    value={this.props.newPasswordConfirm}
                    onChange={this.props.handleChange('newPasswordConfirm')}
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
        )
    };
};


export default withStyles(styles)(PasswordForm);