const styles = theme => ({
    parent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'baseline',
        paddingTop: '30px',
        paddingLeft: '10%',
        margin: '0 auto'
    },
    container: {
        display: 'flex',
        flexWrap: 'no-wrap',
        flexDirection: 'column',
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
        width: 200
    },
    optSwitch: {
        margin: theme.spacing.unit,
    }
});

export default styles;