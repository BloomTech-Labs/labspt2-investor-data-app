import React from 'react';
import firebase from 'firebase';

// Redux imports
import { connect } from 'react-redux';
import { getSettings, updateSettings } from '../../actions/settingsActions.js';

// Material UI Components
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'; 
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";

// WithStyles
import styles from './styles';

class EmailForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            currentEmail: '',
            email: ''
        }
    }

    componentDidMount(){
        const currentEmail = firebase.auth().currentUser.email;
        this.setState({ currentEmail: currentEmail });
        this.props.getSettings();
    };

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        if (this.state.email !== '') {
            this.props.updateSettings('1', this.state);
            this.setState({
                email: ''
            });
        }
    };

    render(){

        const { classes } = this.props;

        return(
            // <form 
            //     className={classes.container}
            //     id='emailForm'
            //     onSubmit={this.handleSubmit}
            // >
                <div 
                    id='currentEmail'
                    // className={classes.container}
                >
                    {/* Current email address header*/}
                    <Typography variant='h6'>Current email address:</Typography>
                    {/* Loading current email... */}
                    {/* {this.props.fetchingSettings ? <p className={classes.currentValue}>Loading...</p> : null } */}
                    {/* Error in loading current email */}
                    {/* {this.props.error !== '' ? <p className={classes.currentValue}>{this.props.error}</p> : null } */}
                    {/* Current email address */}
                    <p className={classes.currentValue}>{this.state.currentEmail}</p>
                </div>
            //     {/* Text field for new email address */}
            //     <TextField 
            //         name='email'
            //         label='New email'
            //         className={classes.textField}
            //         value={this.state.email}
            //         onChange={this.handleChange}
            //         margin='normal'
            //     />
            //     {/* Button to submit new email address */}
            //     <Button 
            //         variant='contained' 
            //         color='primary'
            //         className={classes.button}
            //         type='submit'
            //         form='emailForm'
            //     >
            //         Update email
            //     </Button>
            // </form>
        )
    };
};

const mapStateToProps = state => {
    return {
        fetchingSettings: state.SettingsReducer.fetchingSettings,
        error: state.SettingsReducer.error,
        settings: state.SettingsReducer.settings
    }
};

const mapDispatchToProps = dispatch => ({
    getSettings: () => dispatch(getSettings()),
    updateSettings:  (id, updatedEmail) => dispatch(updateSettings(id, updatedEmail))
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(EmailForm));
