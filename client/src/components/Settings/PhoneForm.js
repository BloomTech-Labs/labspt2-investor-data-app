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

class PhoneForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            phoneNumber: ''
        }
    }

    componentDidMount(){
        const uid = firebase.auth().currentUser.uid;
        this.props.getSettings(uid);
    };

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        const uid = firebase.auth().currentUser.uid;
        if (this.state.phoneNumber !== '') {
            this.props.updateSettings(uid, this.state);
            this.setState({
                phoneNumber: ''
            });
        }
    };

    render(){

        const { classes } = this.props;

        return(
            <form 
                className={classes.container}
                id='phoneForm'
                onSubmit={this.handleSubmit}
            >
                <div>
                    {/* Current phone number header */}
                    <Typography variant='h6'>Current phone:</Typography>
                    {/* Error in loading current phone number */}
                    {this.props.error !== '' ? <p className={classes.currentValue}>{this.props.error}</p> : null }
                    {/* Current phone number */}
                    <p className={classes.currentValue}>{this.props.settings.phoneNumber}</p>
                </div>
                {/* Text field for new phone number */}
                <TextField 
                    name='phoneNumber'
                    label='New phone'
                    className={classes.textField}
                    value={this.state.phoneNumber}
                    onChange={this.handleChange}
                    margin='normal'
                />
                {/* Button to submit new phone number */}
                <Button 
                    variant='contained' 
                    color='secondary'
                    className={classes.button}
                    type='submit'
                    form='phoneForm'
                >
                    Update phone
                </Button>
            </form>
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
    getSettings: (uid) => dispatch(getSettings(uid)),
    updateSettings:  (uid, updatedPhone) => dispatch(updateSettings(uid, updatedPhone))
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(PhoneForm));