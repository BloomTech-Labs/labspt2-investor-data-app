import React from "react";
import Navigation from "../Navigation/index";
import axios from "axios";
import { Route } from "react-router-dom";
import DevList from "../Team/DevList";
class Landing extends React.Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:5000/api/users")
      .then(response => {
        this.setState({ users: response.data });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <div>
        <Navigation />
        <Route
          exact
          path="/"
          render={props => <DevList {...props} users={this.state.users} />}
        />
      </div>
    );
  }
}

export default Landing;
