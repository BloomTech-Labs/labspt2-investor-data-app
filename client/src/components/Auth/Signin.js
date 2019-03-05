import React, { Component } from "react";
// import { Redirect } from "react-router-dom";

export default class Signin extends Component {
  // Added state here for use latter when adding authentication
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      password: "",
      username: "",
      email: ""
    };
  }
  // This is to check for authenticated when we add it in latter this code may change
  checkAUthenticated = () => {
    const authenticated = true;
    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated });
    }
  };

  handleChange = e => {
    e.preventDefault();
    const target = e.target;
    this.setState({ [target.name]: target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    /** TODO:  
 * Would like to add if the user is not identified push to the signup page
 * 
      const creds = this.state
      const endpoint = "http://localhost:3300/api/login";
      axios
        .post(endpoint, creds)
        .then(res => {
        
          localStorage.setItem("jwt", res.data.token);
          this.props.history.push("/jokes");
        })
        .catch(err => {
          console.log("error creating login", err);
        });

 */
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Username:</label>
          <input
            type="username"
            name="username"
            placeholder="username"
            id="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="email"
            id="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <label>Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            id="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <button type="submit">Singin</button>
        </form>
      </div>
    );
  }
}
