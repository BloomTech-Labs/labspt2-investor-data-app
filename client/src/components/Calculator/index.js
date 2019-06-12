import React from 'react';
import InputForm from "./InputForm";
//import Output from "./Output";

// Material UI Components
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
//import Divider from '@material-ui/core/Divider';

// WithStyles
import styles from '../Styles/Calculator/styles';

class Calculator extends React.Component {

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    render() {
        const { classes } = this.props;

        return (
            <div
                className={classes.parent}
            >
                <CssBaseline />
                <Typography
                    component="h1"
                    variant="h2"
                    color="textPrimary"
                   // className={classes.header}
                    gutterBottom
                >
                    Stock Calculator
                </Typography>
                {/* Form to update email address */}
                <InputForm
                    // className={classes.container}
                    gutterBottom
                />
          
            </div>
        )
    };
};


export default withStyles(styles)(Calculator);
