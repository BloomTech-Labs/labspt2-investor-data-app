const styles = theme => ({
  // Parent container
  parent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '35%',
    borderTop: "12px solid purple",
    padding: '30px',
    margin: '20px auto',
    borderRadius: '15px',
    backgroundColor: '#FFFFFF',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
    [theme.breakpoints.down("md")]: {
      borderTop: "8px solid purple",
      margin: "10px, auto",
      padding: "20px",
      width: "50%"
    },
    [theme.breakpoints.down("sm")]: {
      borderTop: "6px solid purple",
      margin: "5px, auto",
      borderRadius: '5px',
      width: "70%",
      padding: "10px"
    },
    [theme.breakpoints.down('xs')]: {
      borderTop: "4px solid purple",
      borderRadius: '0px',
      border: '0',
      width: '100%',
      padding: "5px",
      margin: "auto, auto",
      //minWidth: "320px",
      backgroundColor: '#FAFAFA',
      boxShadow: '0 0 0, 0 0 0'
    }
  },
  header: {
    alignSelf: "center",
    [theme.breakpoints.down("md")]: {
      fontSize: "30px"
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "28px"
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "26px"
    }
  }
});

export default styles;