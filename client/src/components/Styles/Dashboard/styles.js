const styles = theme => ({
  root: {
    // padding: theme.spacing.unit * 3,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
    // backgroundColor: '#846f96',
    // height: '100vh'
  },

  grid: {
    width: 1200,
    flexWrap: 'wrap-reverse',
    justifyContent: 'flex-end',
    // margin: `0 ${theme.spacing.unit * 2}px`,
    [theme.breakpoints.down("sm")]: {
      width: "calc(100% - 75px)"
    },

    [theme.breakpoints.down("md")]: {
      width: "calc(100% - 50px)"
    },

  },
  paper: {
    padding: theme.spacing.unit * 3,
    borderBottom: '2px solid #4C046B',
    textAlign: "left",
    width: '60%',
    height: '100%',
    // position: 'relative',

    color: theme.palette.text.primary,
    // height: '40vh',
    // backgroundColor: '#f4f2ff'
    [theme.breakpoints.down("sm")]: {

      width: '60%',

    },
    [theme.breakpoints.down("xs")]: {

      width: '100%',

    },
  },

  block: {
    padding: 14,
    marginTop: '50px',
    position: 'relative',
    top: -72,
    right: 55,

    [theme.breakpoints.down("sm")]: {

      top: -72,
      right: 24,

    },
    [theme.breakpoints.down("md")]: {

      top: -62,
      right: 15,

    },

  },
  bigAvatar: {

    display: 'none',
    top: 25,
    right: 19,
    [theme.breakpoints.down("sm")]: {
      display: 'inline-block',
      width: 25,
      height: 25,
      top: -10,
      right: 50,

    },

  },
  liveticker: {
    position: 'relative',
    top: -222,
    width: '33%',
    right: -769,
    [theme.breakpoints.down("md")]: {

      right: -580
    },
    [theme.breakpoints.down("sm")]: {
      width: '85%',
      right: -60,
      top: 0
    },
    [theme.breakpoints.down("sm")]: {
      width: '90%',
      right: -30,
      top: 0
    },
  },
  welcome: {
    position: 'relative',
    right: -1190,
    [theme.breakpoints.down("md")]: {
      right: -680
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