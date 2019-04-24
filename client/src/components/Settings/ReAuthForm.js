import React from 'react';
import firebase from 'firebase';

// Material UI Components
import { withStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";

// WithStyles
import styles from './styles';

class ReAuthForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    componentDidMount(){

    };

    render(){

        const { classes } = this.props;

        return(
                <div className={classes.emailContainer}>
                    <Typography variant='h6'>Link a different account</Typography>
                    <p className={classes.currentValue}>Button placeholder</p>
                </div>
        );
    };
};

export default withStyles(styles)(ReAuthForm);
