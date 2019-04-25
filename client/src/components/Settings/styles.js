const styles = theme => ({
    // Parent container 
    parent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '55%',
        padding: '30px',
        margin: '20px auto',
        border: '1px solid #DCDCDC',
        borderRadius: '15px',
        backgroundColor: '#FFFFFF',
        [theme.breakpoints.down('xs')]: {
            border: '0',
            width: '90%',
            backgroundColor: '#FAFAFA'
        },
    },
    // Settings header
    header: {
        alignSelf: 'flex-start'
    },
    // Divider between Settings forms
    divider: {
        width: '100%'
    },
    // Parent email form container
    emailContainer:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%'
    },
    // Parent phone form container
    phoneFormContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        marginBottom: theme.spacing.unit,   
    },
    // Current phone number container
    currentPhoneContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    // Phone number input field container
    phoneField: {
        alignSelf: 'flex-end',
        display: 'flex',
        flexDirection: 'column',
    },
    // Parent email/text preference form container
    emailTextContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%'
    },
    // Current value header
    currentHeader: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit
    },
    // Current value
    currentValue: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit
    },
    // Input field
    textField: {
        marginTop: 0,
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 170,
    },
    // Button
    button: {
        margin: theme.spacing.unit,
        width: 170,
        backgroundColor:theme.palette.secondary.main,
        color:theme.palette.primary.main
    },
    // Switches
    optSwitch: {
        margin: theme.spacing.unit,
    },
});

export default styles;