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

class EmailForm extends React.Component {
    constructor(){
        super();
    };

    componentDidMount(){
        this.props.getSettings();
        console.log(this.props.fetchingSettings);
    };

    render(){

        const { classes } = this.props;

        return(
            <form 
                className={classes.container}
                id='emailForm'
            >
                <div>
                    {/* Show current email address */}
                    <h3 className={classes.currentHeader}>Current email address:</h3>
                    {this.props.fetchingSettings ? <p className={classes.currentValue}>Loading...</p> : null }
                    {this.props.error !== '' ? <p className={classes.currentValue}>{this.props.error}</p> : null }
                    <p className={classes.currentValue}>{this.props.error}</p>
                </div>
                {/* Text field for new email address */}
                <TextField 
                    id='newEmail'
                    label='New email'
                    className={classes.textField}
                    value={this.props.newEmail}
                    onChange={this.props.handleChange('newEmail')}
                    margin='normal'
                />
                {/* Button to submit new email address */}
                <Button 
                    variant='contained' 
                    color='primary'
                    className={classes.button}
                    type='submit'
                    form='emailForm'
                >
                    Update email
                </Button>
            </form>
        )
    };
};

const mapStateToProps = state => {
    return {
        fetchingSettings: state.fetchingSettings,
        error: state.error,
        settings: state.settings
    }
};  

export default withStyles(styles)(connect(mapStateToProps, { getSettings })(EmailForm));
// export default connect(mapStateToProps, { getSettings })(EmailForm);