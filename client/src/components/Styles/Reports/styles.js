const styles = theme => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.grey["50"],
      overflow: "hidden",
      height: "100%"
    },
    grid: {
      width: 1200,
      margin: `0 ${theme.spacing.unit * 2}px`,
      [theme.breakpoints.down("sm")]: {
        width: "calc(100% - 20px)"
      }
    },
    topBar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      
    },
    stockInfo: {
      display: "flex",
      justifyContent: "flex-start",
     
      
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: "left",
      color: theme.palette.text.secondary
    },
    block: {
      padding: theme.spacing.unit * 2
      
    },
    suggestionsContainerOpen: {
      position: "absolute",
      zIndex: 1,
      marginTop: theme.spacing.unit,
      left: 0,
      right: 0
    },
    suggestion: {
      display: "block"
    },
    suggestionsList: {
      
      margin: 0,
      padding: 0,
      listStyleType: "none"
    }
  });

  export default styles;