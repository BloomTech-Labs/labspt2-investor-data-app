import React from 'react';

// Material UI Components
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Divider from '@material-ui/core/Divider';

// WithStyles
import styles from './styles';

// Settings Page Components
import EmailForm from './EmailForm';
import PhoneForm from './PhoneForm';
import OptEmailsTextsForm from './OptEmailsTextsForm';

class Settings extends React.Component {

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    handleSwitch = name => event => {
        this.setState({ [name]: event.target.checked });
    };
    
    render(){
        const { classes } = this.props;

        return(
            <div className={classes.parent}>
                <CssBaseline />
                <Typography
                    component="h1"
                    variant="h2"
                    color="textPrimary"
                    className={classes.header}
                    gutterBottom
                >
                    Settings
                </Typography>
                {/* Form to update email address */}
                <EmailForm 
                    className={classes.container}
                    gutterBottom   
                />
                <Divider 
                    variant="middle" 
                    className={classes.divider}
                />
                {/* Form to update phone number */}
                <PhoneForm /> 
                <Divider 
                    variant="middle" 
                    className={classes.divider}
                />
                {/* Form to opt in/out for texts and emails */}
                <OptEmailsTextsForm
                    className={classes.container}
                />
            </div>
        )
    };
};


export default withStyles(styles)(Settings);
