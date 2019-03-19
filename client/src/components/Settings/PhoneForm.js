import React from 'react';

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
            firstName: ''
        }
    }

    componentDidMount(){
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
            firstName: ''
        });
    };

    render(){

        const { classes } = this.props;

        return(
            <form 
                className={classes.container}
                id='phoneForm'
            >
                <div>
                    {/* Current phone number header */}
                    <h3 className={classes.currentHeader}>Current phone:</h3>
                    {/* Loading current phone number... */}
                    {this.props.fetchingSettings ? <p className={classes.currentValue}>Loading...</p> : null }
                    {/* Error in loading current phone number */}
                    {this.props.error !== '' ? <p className={classes.currentValue}>{this.props.error}</p> : null }
                    {/* Current phone number (Email used as  placeholder) */}
                    <p className={classes.currentValue}>{this.props.settings.email}</p>
                </div>
                {/* Text field for new phone number */}
                <TextField 
                    id='newPhone'
                    label='New phone'
                    className={classes.textField}
                    value={this.props.newPhone}
                    onChange={this.props.handleChange('newPhone')}
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

export default withStyles(styles)(connect(mapStateToProps, { getSettings })(PhoneForm));