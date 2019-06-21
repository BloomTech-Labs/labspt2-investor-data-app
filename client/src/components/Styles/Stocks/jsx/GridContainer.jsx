import React from "react";
import { withStyles, Grid } from "@material-ui/core";

const style = {
  grid: {
    // margin: "10px !important",
    width: "unset",
    display: "inline-flex",
    justifyContent: "space-around"
  }
};

function GridContainer(props) {
  const { classes, children, ...rest } = props;
  return (
    <Grid container {...rest} className={classes.grid}>
      {children}
    </Grid>
  );
}

export default withStyles(style)(GridContainer);
