import React from "react";
import PropTypes from "prop-types";

// Material UI
import { withStyles } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import {
  NavContainer,
  MenuDrawer,
  NavbarLeft,
  NavbarRight
} from "../Styles/Navigation/Main";
//import SigninModal from "./SigninModal";
//import SignupModal from "./SignupModal";
import RegisterLogin from "./RegisterLogin";

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class Navigation extends React.Component {
  //   constructor() {
  //     super();
  //   }

  render() {
    return (
      <div>
        <NavContainer>
          <NavbarLeft>
            <MenuDrawer>
              <i className="fas fa-bars" />
            </MenuDrawer>
            <h2>Pick Em</h2>
          </NavbarLeft>
          <NavbarRight>
            <RegisterLogin />
            
          </NavbarRight>
        </NavContainer>
      </div>
    );
  }
};

const Navigation = props => {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            News
          </Typography>
          <SigninModal />
        </Toolbar>
      </AppBar>
    </div>
  );
};

Navigation.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Navigation);
