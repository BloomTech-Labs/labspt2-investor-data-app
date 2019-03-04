import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'; 

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap'
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
            email: ''
        };
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };
    
    render(){
        const { classes } = this.props;

        return(
            <form className={classes.container}>
                <TextField 
                    id='email'
                    label='Email'
                    className={classes.textField}
                    value={this.state.email}
                    onChange={this.handleChange('email')}
                    margin='normal'
                />
            </form>
        )
    };
};


export default withStyles(styles)(Settings);