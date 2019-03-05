import React from "react";
import Button from "@material-ui/core/Button";
// import TextField from "@material-ui/core/TextField";
import { SingInModal } from "../Styles/Navigation/Signin";
import {
  TextField,
  DialogContent,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";

/* TODO:
 * Create a connection to database
 * Fill in Submit Handler
 * Setup SignUp Model
 * Add in Validation and Testing
 */

export default class FormDialog extends React.Component {
  state = {
    email: "",
    password: "",
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleSignup = () => {
    this.setState({ open: false });
  };

  handleChange = prop => event => {
    event.preventDefault();
    this.setState({ [prop]: event.target.value });
  };

  handleSubmit = e => {
    this.setState({
      email: "",
      password: ""
    });
  };

  render() {
    return (
      <div>
        <Button color="default" onClick={this.handleClickOpen}>
          Sign In
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="signin"
        >
          <DialogContent>
            <SingInModal>
              <DialogTitle id="signin">PICKEM</DialogTitle>
              <DialogContentText>
                Please Sign In <p /> {""}
              </DialogContentText>
              <TextField
                autoFocus
                required
                placeholder="Email"
                // margin="dense"
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
              <DialogActions>
                <Button onClick={this.handleSignup} color="default">
                  Sign Up
                </Button>
                <Button onClick={this.handleSubmit} color="default">
                  Sign In
                </Button>
              </DialogActions>
            </SingInModal>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}
