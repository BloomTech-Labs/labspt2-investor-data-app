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

class EmailForm extends React.Component {
    constructor(){
        super();
        this.state = {
            // email: 'test@example.com',
            // newEmail: ''
        };
    };

    render(){
        const { classes } = this.props;

        return(
            <div>
                {/* FORM TO UPDATE EMAIL ADDRESS */}
                <form 
                    className={classes.container}
                    id='emailForm'
                >
                    <div>
                        <h3 className={classes.currentHeader}>Current email address:</h3>
                        <p className={classes.currentValue}>{this.state.email}</p>
                    </div>
                    <TextField 
                        id='newEmail'
                        label='New email'
                        className={classes.textField}
                        value={this.state.newEmail}
                        onChange={this.props.handleChange('newEmail')}
                        margin='normal'
                    />
                    <Button 
                        variant='contained' 
                        color='primary'
                        className={classes.button}
                        type='submit'
                        form='emailForm'
                    >
                        Update email
                    </Button>
                </form>
            </div>
        )
    };
};


export default withStyles(styles)(EmailForm);