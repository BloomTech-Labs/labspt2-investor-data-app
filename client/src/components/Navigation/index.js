import React from "react";
import {
  NavContainer,
  MenuDrawer,
  NavbarLeft,
  NavbarRight
} from "../Styles/Navigation/Main";
import SigninModal from "./SigninModal";
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
              <i class="fas fa-bars" />
            </MenuDrawer>
            <h2>Pick Em</h2>
          </NavbarLeft>
          <NavbarRight>
            <SigninModal />
          </NavbarRight>
        </NavContainer>
      </div>
    );
  }
}

export default Navigation;
