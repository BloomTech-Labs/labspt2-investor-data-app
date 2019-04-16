import { elementType } from "prop-types";

const styles = theme => ({
    parent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'baseline',
        paddingTop: '30px',
        width: '80%',
        margin: '0 auto',
    },
    container: {
        display: 'flex',
        flexWrap: 'no-wrap',
        flexDirection: 'column',
    },
    emailContainer:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%'
    },
    phoneFormContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
    },
    currentPhoneContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%'
    },
    header: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    currentHeader: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit
    },
    currentValue: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200
    },
    button: {
        margin: theme.spacing.unit,
        width: 200,
        backgroundColor:theme.palette.secondary.main,
        color:theme.palette.primary.main
    },
    optSwitch: {
        margin: theme.spacing.unit,
    }
});

export default styles;