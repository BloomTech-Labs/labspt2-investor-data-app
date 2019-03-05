import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { SignupModal } from "../Styles/Navigation/Signup";
import { TextField } from "@material-ui/core";

/* TODO
 * Create a connection to the databse
 * Add more validation 
 * Add testing
 * Make Signin button go to SignInModal component
 */ 

export default class FormDialog extends React.Component {
  state = {
    email: "",
    password: "",
    passwordConfirm: "",
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleSignin = () => {
    this.setState({ open: false });
  };

  handleChange = prop => event => {
    event.preventDefault();
    this.setState({ [prop]: event.target.value });
  };

  handleSubmit = e => {
    this.setState({
      email: "",
      password: "",
      confirmPassword: ""
    });
    const { password, confirmPassword } = this.state; 
    if (password !== confirmPassword) {
      alert("Passwords don't match");
    }
  };

  render() {
    return (
      <div>
        <Button color="default" onClick={this.handleClickOpen}>
          Sign Up
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="signup"
        >
          <DialogContent>
            <SignupModal>
              <DialogTitle id="signup">PICKEM</DialogTitle>
              <DialogContentText>
                Please Sign Up <p /> {""}
              </DialogContentText>
              <TextField
                autoFocus
                required
                placeholder="Email"
                id="email"
                label="Email Address"
                type="email"
                name="email"
                variant="outlined"
                value={this.state.email}
                onChange={this.handleChange("email")}
              />
              <p />
              {""}
              <TextField
                id="password"
                type="password"
                variant="outlined"
                required
                name="password"
                label="Password"
                value={this.state.password}
                onChange={this.handleChange("password")}
              />
              <TextField
                id="confirmPassword"
                type="password"
                variant="outlined"
                required
                name="confirmPassword"
                label="Confirm Password"
                value={this.state.confirmPassword}
                onChange={this.handleChange("confirmPassword")}
              />
              <DialogActions>
                <Button onClick={this.handleSubmit} color="default">
                  Sign Up
                </Button>
                <Button onClick={this.handleSignin} color="default">
                  Sign In
                </Button>
              </DialogActions>
            </SignupModal>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}
