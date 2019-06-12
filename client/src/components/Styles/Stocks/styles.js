const styles = theme => ({
  root: {
    flexGrow: -1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30
  },

  grid: {
    width: 1200,
    flexWrap: "wrap-reverse",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    [theme.breakpoints.down("sm")]: {
      width: "calc(100% - 75px)",
      padding: "0px",
      margin: "0px"
    },

    [theme.breakpoints.down("md")]: {
      width: "calc(100% - 50px)",
      padding: "0px"
    }
  },
  paper: {
    flexGrow: 1,
    padding: theme.spacing.unit * 2,
    textAlign: "right",
    minWidth: "325px",
    borderTop: "5px solid #4C046B",
    color: theme.palette.text.primary
  },

  block: {
    padding: 25,
    width: "calc(100% - 250px)",
    marginTop: "50px",
    position: "relative",
    justifyContent: "flex-start",
    top: -72,
    right: 55,
    fontSize: ".8rem",

    [theme.breakpoints.down("xs")]: {
      top: -72,
      right: 108
    },
    [theme.breakpoints.down("md")]: {
      top: -43
    }
  },
  card: {
    padding: 25,
    marginTop: "50px",
    position: "relative",
    top: -72,
    left: 100,
    fontSize: ".8rem",

    [theme.breakpoints.down("xs")]: {
      top: -72,
      right: 8
    },
    [theme.breakpoints.down("md")]: {
      top: -43,
      right: 100
    }
  },
  bigAvatar: {
    display: "none",
    top: 25,
    right: 19,
    [theme.breakpoints.down("sm")]: {
      display: "inline-block",
      width: 25,
      height: 25,
      top: -10,
      right: 50
    }
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
  },
  welcome: {
    position: "relative",
    right: -1114,
    [theme.breakpoints.down("md")]: {
      right: -770
    },
    [theme.breakpoints.down("sm")]: {
      right: -680
    },
    [theme.breakpoints.down("sm")]: {
      right: -25
    }
  }
});

export default styles;
