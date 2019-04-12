const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.grey["100"],
    overflow: "hidden"
    //height: "100vh"
  },
  grid: {
   // width: 1200,
    width: 800,
    margin: `0 ${theme.spacing.unit * 2}px`,
    [theme.breakpoints.down("sm")]: {
      width: "calc(100% - 20px)"
    }
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "left",
    color: theme.palette.text.primary,
    // height: '40vh',
    backgroundColor: '#D8DBE2'
  
  },
  block: {
    padding: theme.spacing.unit * 2
  },
  bigAvatar: {
    margin: 10,
    width: 40,
    height: 40,

  }

});

export default styles;
