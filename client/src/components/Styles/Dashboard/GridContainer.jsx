import React from 'react'
import {withStyles, Grid} from '@material-ui/core'


const style = {
    grid: {
        // margin: "10px !important",
        padding: '10px',
        width: "unset",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    } 

 
}

function GridContainer(props) {
    const { classes, children, ...rest } = props;
    return (
      <Grid container {...rest} className={classes.grid}>
        {children}
      </Grid>
    );
  }
  
  export default withStyles(style)(GridContainer);
  