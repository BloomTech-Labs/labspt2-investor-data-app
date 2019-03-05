import React from 'react';

// MATERIAL UI COMPONENTS
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'; 
import Button from '@material-ui/core/Button';

// WITHSTYLES
import styles from './styles';

class EmailForm extends React.Component {
    constructor(){
        super();
    };

    render(){


        const { classes } = this.props;

        return(
            <form 
                className={classes.container}
                id='emailForm'
            >
                <div>
                    {/* Show current email address */}
                    <h3 className={classes.currentHeader}>Current email address:</h3>
                    <p className={classes.currentValue}>{this.state.email}</p>
                </div>
                {/* Text field for new email address */}
                <TextField 
                    id='newEmail'
                    label='New email'
                    className={classes.textField}
                    value={this.state.newEmail}
                    onChange={this.props.handleChange('newEmail')}
                    margin='normal'
                />
                {/* Button to submit new email address */}
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
        )
    };
};


export default withStyles(styles)(EmailForm);