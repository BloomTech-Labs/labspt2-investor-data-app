const styles = theme => ({
  // Parent container
  parent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "55%",
    padding: "30px",
    margin: "20px auto",
    border: "1px solid #DCDCDC",
    borderRadius: "15px",
    backgroundColor: "#FFFFFF",
    [theme.breakpoints.down("xs")]: {
      border: "0",
      width: "90%",
      backgroundColor: "#FAFAFA"
    }
  },
  // Button
  button: {
    margin: theme.spacing.unit,
    width: 170,
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.main
  }
});

export default styles;
