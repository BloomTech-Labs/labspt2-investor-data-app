import React from 'react';
import PropTypes from 'prop-types';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import withStyles from '@material-ui/core/styles/withStyles';
import {Avatar, Button, CssBaseline, FormControl, FormControlLabel, Checkbox, Input,InputLabel, Paper, Typography} from "@material-ui/core"
import {styles} from '../Styles/Navigation/Signin'
class  Signin extends React.Component {
  constructor(props) {
    super(props)
  
  this.state ={
    username: '',
    password: ''
  }
 
  }
  handleChange = (e) =>{
    this.setState({[e.target.name]: e.target.value})
  }

  singin = (e) => {
    e.preventDefault()
  }
  
  render() {
    const {classes} = this.props
    return (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input id="username" name="username" onChange={this.handleChange} autoComplete="username" autoFocus />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input name="password" type="password" id="password" onChange={this.handleChange} autoComplete="current-password" />
          </FormControl>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign in
          </Button>
        </form>
      </Paper>
    </main>
  );
}
}

Signin.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Signin);