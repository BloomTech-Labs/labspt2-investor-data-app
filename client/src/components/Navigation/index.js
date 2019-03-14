import React from "react";
import {
  NavContainer,
  MenuDrawer,
  NavbarLeft,
  NavbarRight
} from "../Styles/Navigation/Main";
import SigninModal from "./SigninModal";
import SignupModal from "./SignupModal";
import RegisterLogin from "./RegisterLogin";

class Navigation extends React.Component {
  //   constructor() {
  //     super();
  //   }

  render() {
    return (
      <div>
        <NavContainer>
          <NavbarLeft>
            <MenuDrawer>
              <i className="fas fa-bars" />
            </MenuDrawer>
            <h2>Pick Em</h2>
          </NavbarLeft>
          <NavbarRight>
            <RegisterLogin />
            <SigninModal />
            <SignupModal />
          </NavbarRight>
        </NavContainer>
      </div>
    );
  }
}

export default Navigation;
