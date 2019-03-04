import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { SingInModal } from "../Styles/Navigation/Signin";

/* TODO:  Need to change onClicks to hadle inputs. */

export default class FormDialog extends React.Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
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
              <DialogTitle id="signin">Sign In</DialogTitle>
              <DialogContentText>
                Please Sign In <p /> {""}
              </DialogContentText>
              <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                variant="outlined"
              />{" "}
              {""}
              <TextField
                required
                margin="dense"
                id="password"
                label="Password"
                type="password"
                variant="outlined"
              />
              <DialogActions>
                <Button onClick={this.handleClose} color="default">
                  Sign Up
                </Button>
                <Button onClick={this.handleClose} color="default">
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
