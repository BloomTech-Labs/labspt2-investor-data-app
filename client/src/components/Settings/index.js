import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'; 
import Button from '@material-ui/core/Button';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column'
    },
    header: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    currentHeader: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit
    },
    currentValue: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200
    },
    button: {
        margin: theme.spacing.unit,
        width: 200
    }
});

class Settings extends React.Component {
    constructor(){
        super();
        this.state = {
            email: 'test@example.com',
            phone: '888-888-8888',
            newEmail: '',
            newPhone: ''
        };
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };
    
    render(){
        const { classes } = this.props;

        return(
            <div>
                <CssBaseline />
                <form 
                    className={classes.container}
                    id='emailForm'
                >
                    <h2 className={classes.header}>
                        Settings
                    </h2>
                    <div>
                        <h3 className={classes.currentHeader}>Current email address:</h3>
                        <p className={classes.currentValue}>{this.state.email}</p>
                    </div>
                    <TextField 
                        id='newEmail'
                        label='New email'
                        className={classes.textField}
                        value={this.state.newEmail}
                        onChange={this.handleChange('newEmail')}
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
            </div>
        )
    };
};


export default withStyles(styles)(Settings);