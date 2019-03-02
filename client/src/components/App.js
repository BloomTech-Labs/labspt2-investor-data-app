import React, { Component } from 'react';

import Dashboard from '../components/Dashboard'

import CssBaseline from '@material-ui/core/CssBaseline';

class App extends Component {
  render() {
    return (
      <div>
        <CssBaseline />
        <Dashboard />
      </div>
    );
  }
}

export default App;
