import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'; 
import CssBaseline from '@material-ui/core/CssBaseline';

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
    textField : {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200
    }
});

class Settings extends React.Component {
    constructor(){
        super();
        this.state = {
            currentEmail: 'test@example.com',
            currentPhone: '888-888-8888',
            email: '',
            phone: ''
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
                <form className={classes.container}>
                    <h1 className={classes.header}>
                        Settings
                    </h1>
                    <h2 className={classes.currentHeader}>Current email address:</h2>
                    <p className={classes.currentValue}>{this.state.currentEmail}</p>
                    <TextField 
                        id='email'
                        label='New email'
                        className={classes.textField}
                        value={this.state.email}
                        onChange={this.handleChange('email')}
                        margin='normal'
                    />
                </form>
                <form className={classes.container}>
                <h2 className={classes.currentHeader}>Current phone:</h2>
                <p className={classes.currentValue}>{this.state.currentPhone}</p>
                <TextField 
                    id='phone'
                    label='New phone'
                    className={classes.textField}
                    value={this.state.phone}
                    onChange={this.handleChange('phone')}
                    margin='normal'
                />
                </form>
            </div>
        )
    };
};


export default withStyles(styles)(Settings);