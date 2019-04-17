import {
    blackColor,
    whiteColor,
    hexToRgb,
    purpleColor
  } from './jss/dashboard-cards';
  


const cardStyle = {
    card: {
      borderBottom: "2px solid rgba(" + hexToRgb(purpleColor) + ", 1)",
      marginTop: "8px",
      borderRadius: "5px",
      color: "rgba(" + hexToRgb(blackColor) + ", 1)",
      background: "rgba(" + hexToRgb(whiteColor) + ", 1)",
      minWidth: 255,
      height: 102,
      boxShadow: "0 1px 4px 0 rgba(" + hexToRgb(blackColor) + ", 0.14)",
      // position: "relative",
      display: "flex",
      flexDirection: 'column',
      flexWrap:'wrap',
      justifyContent: 'center',
      textAlign:'center',
      alignItems: 'center',
      // minWidth: "0",
      wordWrap: "break-word",
      fontSize: ".875rem",
      padding: '0 10px'
 
      }
    
    
  };
  
  export default cardStyle;
  