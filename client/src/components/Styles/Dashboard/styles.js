const styles = theme => ({
  root: {
    margin: '0 auto'
  },
  grid: {
<<<<<<< HEAD
    width: 1200,
    flexWrap: 'wrap-reverse',
    justifyContent: 'flex-end',
=======
    //width: 1200,
    width: 1000,
>>>>>>> 3167ba7ab085f09404694b48345e47da530961d1
    margin: `0 ${theme.spacing.unit * 2}px`,
    [theme.breakpoints.down("sm")]: {
      width: "calc(100% - 75px)"
    },
  
    [theme.breakpoints.down("md")]: {
      width: "calc(100% - 50px)"
    },
   
  },
  paper: {
<<<<<<< HEAD
    padding: theme.spacing.unit * 3,
    // textAlign: "left",
    // color: theme.palette.text.primary,
    // // height: '40vh',
    // backgroundColor: '#887291'
  
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
    [theme.breakpoints.down("sm")]: {
    display: 'inline-block',
    width: 25,
    height: 25,
    top:16,
    right: 10,

    },

  },
  liveticker :{
    position: 'relative',
    top: -70,
    right:44,
    [theme.breakpoints.down("sm")]: {
      top: 2,
          right: 25
      },
      [theme.breakpoints.down("xs")]: {
        top: 2,
            right: 25
        },
  }
=======
    padding: theme.spacing.unit * 2,
    textAlign: "left",
    color: theme.palette.text.primary,
    // height: '40vh',
    backgroundColor: '#D8DBE2'
  
  },
  block: {
    padding: theme.spacing.unit * 1
  },
  bigAvatar: {
    margin: 10,
    width: 40,
    height: 40,
  },
  card: {
    marginBottom: 4, 
    minWidth: 175,
    //maxWidth: 300,
    backgroundColor: "#e8eaf6"
   }
>>>>>>> 3167ba7ab085f09404694b48345e47da530961d1

});

export default styles;
