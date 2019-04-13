// import React from "react";
// import axios from "axios";
// import { Route } from "react-router-dom";
// import PropTypes from 'prop-types'
// import UsersList from "../Team/UsersList";


// class Team extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       users: []
//     };
//   }
//   componentDidMount() {
//     axios
//       .get("https://pickemm.herokuapp.com/api/users")
//       .then(response => {
//         this.setState({ users: response.data });
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }
//   render() {
//     return (
//       <div>
//         <Route
//           exact
//           path="/"
//           render={props => <UsersList {...props} users={this.state.users} />}
//         />
//       </div>
//     );
//   }
// }
// Team.propTypes = {
//   users:PropTypes.arrayOf( PropTypes.shape({
//     id:  PropTypes.number.isRequired,
//     firstName: PropTypes.string.isRequired,
//     lastName: PropTypes.string.isRequired
//   }
//   ))
//  }


// export default Team
