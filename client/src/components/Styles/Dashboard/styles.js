const styles = theme => ({
  root: {
    // padding: theme.spacing.unit * 3,
    flexGrow: -1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30

    // backgroundColor: '#846f96',
    // height: '100vh'
  },

  grid: {
    width: 1200,
    flexWrap: "wrap-reverse",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    margin: `0 ${theme.spacing.unit * 2}px`
  },
  paper: {
    flexGrow: 1,
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    borderTop: "5px solid #4C046B",
    color: theme.palette.text.primary
  },

  block: {
    padding: 25,
    marginTop: "50px",
    position: "relative",
    top: -72,
    right: 55,
    fontSize: ".8rem",

    [theme.breakpoints.down("xs")]: {
      top: -72,
      right: 8
    },
    [theme.breakpoints.down("md")]: {
      top: -43
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
  liveticker: {
    right: -769,
    [theme.breakpoints.down("md")]: {
      right: -580
    },
    [theme.breakpoints.down("sm")]: {
      width: "85%",
      right: -60,
      top: 0
    },
    [theme.breakpoints.down("sm")]: {
      width: "90%",
      right: -30,
      top: 0
    }
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
