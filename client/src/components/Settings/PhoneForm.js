import React from 'react';
import firebase from 'firebase';

// Redux imports
import { connect } from 'react-redux';
import { getSettings, updateSettings } from '../../actions/settingsActions.js';

// Material UI Components
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'; 
import Button from '@material-ui/core/Button';

// WithStyles
import styles from './styles';

class PhoneForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            // Placeholder to use until phone number added as part of user schema
            currentPhone: '',
            phoneNumber: ''
        }
    }

    componentDidMount(){
        const currentPhone = firebase.auth().currentUser.phoneNumber;
        this.setState({ currentPhone: currentPhone });
        this.props.getSettings();
    };

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        this.props.updateSettings('1', this.state);
        this.setState({
            phoneNumber: ''
        });
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
                    <h3 className={classes.currentHeader}>Current phone:</h3>
                    {/* Loading current phone number... */}
                    {this.props.fetchingSettings ? <p className={classes.currentValue}>Loading...</p> : null }
                    {/* Error in loading current phone number */}
                    {this.props.error !== '' ? <p className={classes.currentValue}>{this.props.error}</p> : null }
                    {/* Current phone number (Email used as  placeholder) */}
                    <p className={classes.currentValue}>{this.state.currentPhone}</p>
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
                    color='primary'
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
    getSettings: () => dispatch(getSettings()),
    updateSettings:  (id, updatedPhone) => dispatch(updateSettings(id, updatedPhone))
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(PhoneForm));