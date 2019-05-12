import React from "react";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import { fire } from "../Auth/firebaseConfig";
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
import { connect } from "react-redux";
import { logout } from "../../actions/reportsActions";
import * as ROUTES from "../../constants/routes";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 2,
    fontFamily: "Arkhip-Regular",
    fontSize: 25,
    letterSpacing: 3.5,
    display: "flex",
    flexWrap: "wrap",
    alignSelf: "center"
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

class Navigation extends React.Component {
  _isMounted = false;
  state = {
    anchorEl: null,
    redirect: false
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  signOut = () => {
    fire.signOut();
    this.props.logout();
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
              _-| PICKEM
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
              <Link
                component={RouterLink}
                to={ROUTES.LANDING}
                style={{ textDecoration: "none" }}
              >
                <MenuItem onClick={this.handleMenuClose}>Home</MenuItem>
              </Link>
              <Link
                component={RouterLink}
                to={ROUTES.BILLING}
                style={{ textDecoration: "none" }}
              >
                <MenuItem onClick={this.handleMenuClose}>Billing</MenuItem>
              </Link>
              {this.props.authenticated ? (
                <div>
                  <Link
                    component={RouterLink}
                    to={ROUTES.DASHBOARD}
                    style={{ textDecoration: "none" }}
                  >
                    <MenuItem onClick={this.handleMenuClose}>
                      Dashboard
                    </MenuItem>
                  </Link>
                  <Link
                    component={RouterLink}
                    to={ROUTES.REPORTS}
                    style={{ textDecoration: "none" }}
                  >
                    <MenuItem onClick={this.handleMenuClose}>Reports</MenuItem>
                  </Link>
                  <Link
                    component={RouterLink}
                    to={ROUTES.SETTINGS}
                    style={{ textDecoration: "none" }}
                  >
                    <MenuItem onClick={this.handleMenuClose}>Settings</MenuItem>
                  </Link>

                  <MenuItem onClick={this.signOut}>Sign Out</MenuItem>
                </div>
              ) : null}
            </Menu>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

Navigation.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(
  connect(
    "",
    mapDispatchToProps
  )(Navigation)
);
