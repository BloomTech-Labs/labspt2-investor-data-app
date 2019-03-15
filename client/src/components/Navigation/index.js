import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  NavContainer,
  MenuDrawer,
  NavbarLeft,
  NavbarRight
} from "../Styles/Navigation/Main";
//import SigninModal from "./SigninModal";
//import SignupModal from "./SignupModal";
import RegisterLogin from "./RegisterLogin";

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
