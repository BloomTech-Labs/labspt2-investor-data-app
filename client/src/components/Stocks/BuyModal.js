import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Tooltip from "@material-ui/core/Tooltip";
import Popover from "@material-ui/core/Popover";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
// core components
import Button from "../Styles/Stocks/jsx/Button.jsx";

import modalStyle from "../Styles/Stocks/jsx/modalStyle.jsx";
import popoverStyles from "../Styles/Stocks/jsx/popoverStyles.jsx";
import tooltipsStyle from "../Styles/Stocks/jsx/tooltipsStyle.jsx";

const style = theme => ({
  ...modalStyle(theme),
  ...popoverStyles,
  ...tooltipsStyle
});

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class BuyModal extends React.Component {
  anchorElLeft = null;
  constructor(props) {
    super(props);
    this.state = {
      openLeft: false,
      liveDemo: false
    };
  }
  handleClosePopover(state) {
    this.setState({
      [state]: false
    });
  }
  handleClickButton(state) {
    this.setState({
      [state]: true
    });
  }
  handleClickOpen(modal) {
    var x = [];
    x[modal] = true;
    this.setState(x);
  }
  handleClose(modal) {
    var x = [];
    x[modal] = false;
    this.setState(x);
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button
          color="success"
          size="sm"
          onClick={() => this.handleClickOpen("liveDemo")}
        >
          Buy
        </Button>
        <Dialog
          classes={{
            root: classes.modalRoot,
            paper: classes.modal
          }}
          open={this.state.liveDemo}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => this.handleClose("liveDemo")}
          aria-labelledby="classic-modal-slide-title"
          aria-describedby="classic-modal-slide-description"
        >
          <DialogTitle
            id="classic-modal-slide-title"
            disableTypography
            className={classes.modalHeader}
          >
            <Button
              simple
              className={classes.modalCloseButton}
              key="close"
              aria-label="Close"
              onClick={() => this.handleClose("liveDemo")}
            >
              {" "}
              <Close className={classes.modalClose} />
            </Button>
            <h4 className={classes.modalTitle}>Buy Stock Shares</h4>
          </DialogTitle>
          <DialogContent
            id="classic-modal-slide-description"
            className={classes.modalBody}
          >
            <h4>Popover in a modal</h4>
            <p>
              This
              <Button
                color="secondary"
                buttonRef={node => {
                  this.anchorElLeft = node;
                }}
                onClick={() => this.handleClickButton("openLeft")}
              >
                Button
              </Button>
              <Popover
                classes={{
                  paper: classes.popover
                }}
                open={this.state.openLeft}
                anchorEl={this.anchorElLeft}
                anchorReference={"anchorEl"}
                onClose={() => this.handleClosePopover("openLeft")}
                anchorOrigin={{
                  vertical: "center",
                  horizontal: "left"
                }}
                transformOrigin={{
                  vertical: "center",
                  horizontal: "right"
                }}
              >
                <h3 className={classes.popoverHeader}>Popover on left</h3>
                <div className={classes.popoverBody}>
                  Here will be some very useful information about his popover.
                  Here will be some very useful information about his popover.
                </div>
              </Popover>
              triggers a popover on click.
            </p>
            <hr />
            <h4>Tooltips in a modal</h4>
            <p>
              <Tooltip
                id="ex-to-po-1"
                title="Default tooltip"
                placement="top"
                classes={{ tooltip: classes.tooltip }}
              >
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  {" "}
                  This link{" "}
                </a>
              </Tooltip>{" "}
              and
              <Tooltip
                id="ex-to-po-2"
                title="Default tooltip"
                placement="top"
                classes={{ tooltip: classes.tooltip }}
              >
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  {" "}
                  that link{" "}
                </a>
              </Tooltip>
              have tooltips on hover.
            </p>
          </DialogContent>
          <DialogActions className={classes.modalFooter}>
            <Button
              onClick={() => this.handleClose("liveDemo")}
              color="secondary"
            >
              Close
            </Button>
            <Button color="primary">Save changes</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(style)(BuyModal);
