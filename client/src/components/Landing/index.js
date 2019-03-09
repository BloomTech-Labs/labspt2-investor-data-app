import React from "react";
import Navigation from "../Navigation/index";
import axios from "axios";
import { Route } from "react-router-dom";
// import { data } from "../../data";
import UsersList from "../Team/UsersList";
class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }
  componentDidMount() {
    // this.setState({ users: data });
    axios
      .get("https://pickemm.herokuapp.com/api/users")
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
          render={props => <UsersList {...props} users={this.state.users} />}
        />
      </div>
    );
  }
}


export default Landing