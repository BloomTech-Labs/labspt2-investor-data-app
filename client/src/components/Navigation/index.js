import React from "react";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";

// Material UI
import { withStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
  Link
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

//import SigninModal from "./SigninModal";
//import SignupModal from "./SignupModal";
import RegisterLogin from "./RegisterLogin";
import * as ROUTES from "../../constants/routes";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

class Navigation extends React.Component {
  state = {
    anchorEl: null
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Pick Em
            </Typography>
            <IconButton
              aria-owns={open ? "menu-appbar" : undefined}
              aria-haspopup="true"
              onClick={this.handleMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={open}
              onClose={this.handleMenuClose}
            >
              <MenuItem onClick={this.handleMenuClose}>Home</MenuItem>
              <MenuItem onClick={this.handleMenuClose}>Dashboard</MenuItem>
              <MenuItem onClick={this.handleMenuClose}>Settings</MenuItem>
              <MenuItem onClick={this.handleMenuClose}>Billing</MenuItem>
              {/* <MenuItem onClick={this.handleMenuClose}><Link component={RouterLink} to={ROUTES.LANDING} style={{textDecoration: "none"}}>Home</Link></MenuItem>
              <MenuItem onClick={this.handleMenuClose}><Link component={RouterLink} to={ROUTES.DASHBOARD} style={{textDecoration: "none"}}>Dashboard</Link></MenuItem>
              <MenuItem onClick={this.handleMenuClose}><Link component={RouterLink} to={ROUTES.SETTINGS} style={{textDecoration: "none"}}>Settings</Link></MenuItem>
              <MenuItem onClick={this.handleMenuClose}><Link component={RouterLink} to={ROUTES.BILLING} style={{textDecoration: "none"}}>Billing</Link></MenuItem> */}
            </Menu>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Navigation);
