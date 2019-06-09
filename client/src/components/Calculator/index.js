import React from 'react';
import InputForm from "./InputForm";
//import Output from "./Output";

// Material UI Components
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Divider from '@material-ui/core/Divider';

// WithStyles
import styles from '../Styles/Calculator/styles';

// Calculator Page Components
//import EmailForm from './EmailForm';
//import PhoneForm from './PhoneForm';
//import OptEmailsTextsForm from './OptEmailsTextsForm';

class Calculator extends React.Component {

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    handleSwitch = name => event => {
        this.setState({ [name]: event.target.checked });
    };
    
    render(){
        const { classes } = this.props;

        return(
            <div 
                className={classes.parent}
            >
                <CssBaseline />
                <Typography
                    component="h1"
                    variant="h2"
                    color="textPrimary"
                    className={classes.header}
                    gutterBottom
                >
                    Stock Calculator
                </Typography>
                {/* Form to update email address */}
                 <InputForm 
                    className={classes.container}
                    gutterBottom   
                />
                <Divider 
                    variant="middle" 
                    className={classes.divider}
                />
                {/* Form to update phone number */}
               {/*  <Output />  */}
                <Divider 
                    variant="middle" 
                    className={classes.divider}
                />
                {/* Form to opt in/out for texts and emails */}
               {/*  <OptEmailsTextsForm
                    className={classes.container}
                /> */}
            </div>
        )
    };
};


export default withStyles(styles)(Calculator);
