<<<<<<< HEAD
import React from "react";
import Navigation from "../Navigation/index";
// import axios from "axios";
import { Route } from "react-router-dom";
import { data } from "../../data";
import DevList from "../Team/DevList";
class Landing extends React.Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
  }
  componentDidMount() {
    this.setState({ users: data });
    // axios
    //   .get("https://pickemm.herokuapp.com/api/users")
    //   .then(response => {
    //     this.setState({ users: response.data });
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
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
=======
import React from 'react'
import Navigation from '../Navigation/index'

class Landing extends React.Component {
    constructor(){
        super();
    }
    
    render(){
        return(
            <div>
                <Navigation /> 
            </div>
        )
    }
>>>>>>> 41b615ccb0eae5cfbd50f2a47598c210b1e372c4
}


export default Landing