import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'; 

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column'
    },
    header: {
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
            <form className={classes.container}>
                <h1
                    className={classes.header}
                >
                    Settings
                </h1>
                <TextField 
                    id='email'
                    label='Email'
                    className={classes.textField}
                    value={this.state.email}
                    onChange={this.handleChange('email')}
                    margin='normal'
                />
                <TextField 
                    id='phone'
                    label='Phone'
                    className={classes.textField}
                    value={this.state.phone}
                    onChange={this.handleChange('phone')}
                    margin='normal'
                />
            </form>
        )
    };
};


export default withStyles(styles)(Settings);