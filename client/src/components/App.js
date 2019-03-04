import React, { Component } from 'react';
import Landing from '../components/Landing/index'
import Settings from '../components/Settings/index'

import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Landing />
        <Settings />
      </div>
    );
  }
}

export default App;
