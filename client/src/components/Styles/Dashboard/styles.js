const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 3,
    margin: '0 auto'
  },
  grid: {
    width: 1200,
    flexWrap: 'wrap-reverse',
    justifyContent: 'flex-end',
    margin: `0 ${theme.spacing.unit * 2}px`,
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
    padding: theme.spacing.unit * 2,
    margin:20,
    position: 'relative',
    top: -72,
    right:24,

    [theme.breakpoints.down("sm")]: {
   
      top: -72,
      right:24,
  
      },
      [theme.breakpoints.down("md")]: {
   
        top: -62,
        right:35,
    
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
    top:-10,
    right: 50,

    },

  },
  liveticker :{
    position: 'relative',
    top: -139,
    right:44,
    [theme.breakpoints.down("sm")]: {
      top: -72,
          right: 75
      },
      [theme.breakpoints.down("xs")]: {
        top: 2,
            right: 10
        },
  },
  welcome : {
     position: 'relative',
      right: -1190,
      [theme.breakpoints.down("md")]: {
     
        right: -680
    },
    [theme.breakpoints.down("sm")]: {
     
      right:-680
  },

  [theme.breakpoints.down("sm")]: {
   
        right: -25
    },
  }

});

export default styles;
