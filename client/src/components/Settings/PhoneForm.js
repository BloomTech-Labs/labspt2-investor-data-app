import React from 'react';

// Redux imports
import { connect } from 'react-redux';
import { getSettings } from './actions';

// Material UI Components
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'; 
import Button from '@material-ui/core/Button';

// WithStyles
import styles from './styles';

class PhoneForm extends React.Component {

    componentDidMount(){
        this.props.getSettings();
    };

    render(){

        const { classes } = this.props;

        return(
            <form 
                className={classes.container}
                id='phoneForm'
            >
                {/* Show current phone number */}
                <div>
                    <h3 className={classes.currentHeader}>Current phone:</h3>
                    <p className={classes.currentValue}>{this.props.phone}</p>
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