import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Switch, Route } from 'react-router-dom';

import Landing from '../components/Landing/index'
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Landing />
        <Switch>
          
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
