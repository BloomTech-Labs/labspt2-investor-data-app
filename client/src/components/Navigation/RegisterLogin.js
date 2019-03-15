import React from "react";
import {Button, Dialog, DialogContent, DialogTitle, AppBar, Tabs, Tab, Typography} from "@material-ui/core";
import PropTypes from "prop-types";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
});

export default class RegisterLogin extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
      value: 0,
      email: "",
      passwordMessage: "",
      password1: "",
      password2: ""
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };
  inputchange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  submit = event => {
    event.preventDefault();
    const { password1, password2 } = this.state;
    if (password1 !== password2) {
      this.setState({
        passwordMessage: "Passwords do not match!"
      });
    } else {
      this.setState({
        passwordMessage: "Passwords match!"
      });
    }
  };

  render() {
    const { passwordMessage, value } = this.state;
    return (
      <div>
        <Button
          variant="outlined"
          color="primary"
          onClick={this.handleClickOpen}
        >
          Get Started
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Register or Login</DialogTitle>
          <DialogContent>
            <AppBar position="static">
              <Tabs value={value} onChange={this.handleChange}>
                <Tab label="Register" />
                <Tab label="Login" />
              </Tabs>
            </AppBar>
            {value === 0 && (
              <TabContainer>
                <form onSubmit={this.submit}>
                  Enter Email Address:
                  <input
                    type="email"
                    name="email"
                    value={this.state.email}
                    onChange={this.inputchange}
                  />
                  <br />
                  Enter Password:
                  <input
                    type="password"
                    name="password1"
                    value={this.state.password1}
                    onChange={this.inputchange}
                  />
                  {passwordMessage ? <span>{passwordMessage}</span> : null}
                  <br />
                  Confirm Password:
                  <input
                    type="password"
                    label="Confirm Passowrd"
                    name="password2"
                    value={this.state.password2}
                    onChange={this.inputchange}
                  />
                  {passwordMessage ? <span>{passwordMessage}</span> : null}
                  <button type="submit">Submit</button>
                </form>
              </TabContainer>
            )}
            {value === 1 && (
              <TabContainer>
                Enter Email Address:
                <input
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.inputchange}
                />
                <br />
                Enter Password:
                <input
                  type="password"
                  name="password1"
                  value={this.state.password1}
                  onChange={this.inputchange}
                />
                <button type="submit">Submit</button>
              </TabContainer>
            )}
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}
