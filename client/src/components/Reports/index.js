import React, { Component } from "react";
import PropTypes from "prop-types";

class Reports extends Component {
  render() {
    if (this.state == null) {
      return <div>Loading...</div>;
    }

    return <div>Reports</div>;
  }
}

export default Reports;
