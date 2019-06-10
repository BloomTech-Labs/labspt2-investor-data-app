const styles = theme => ({
  // Parent container 
  parent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '55%',
    padding: '30px',
    margin: '20px auto',
    borderRadius: '15px',
    backgroundColor: '#FFFFFF',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
    [theme.breakpoints.down('xs')]: {
      border: '0',
      width: '90%',
      backgroundColor: '#FAFAFA',
      boxShadow: '0 0 0, 0 0 0'
    }
  }
  // Settings header
 
  // Parent phone form container
 
  // Current phone number container
  
  // Phone number input field container
 
  // Parent email/text preference form container
 
  // Current value header
 
  // Button
 
  // Switches

});

export default styles;