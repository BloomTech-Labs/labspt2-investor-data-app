import React from 'react'
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
})

class Settings extends React.Component {
    constructor(){
        super();
    }
    
    render(){
        const { classes } = this.props;

        return(
            <form className={classes.container}>
                Test
            </form>
        )
    }
}


export default withStyles(styles)(Settings);