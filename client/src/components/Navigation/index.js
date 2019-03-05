import React from 'react'
import styled from "styled-components";
import SignupModal from "./SignupModal";

const NavContainer = styled.section`
  display: flex; 
  flex-wrap: wrap; 
  align-items: center; 
  justify-content: space-between;  
  padding: 0% 5%;
  background-color: rgba(0, 0, 0, 0.1); 
`
const NavbarRight = styled.div`
  font-weight: 600; 
  font-size: 18px;
`

const NavbarLeft = styled.div`
    display: flex; 
    flex-wrap: wrap; 
    align-items: center; 
    width: 60%; 
`

const MenuDrawer = styled.div`
    font-size: 24px; 
    margin-right: 5%; 
`

class Navigation extends React.Component {
    constructor(){
        super();
    }

    render(){
        return(
            <div>
                <NavContainer>
                    <NavbarLeft>
                        <MenuDrawer>
                        <i class="fas fa-bars"></i>
                         </MenuDrawer>
                        <h2>Pick Em</h2>
                    </NavbarLeft>
                    <NavbarRight>
                    <SignupModal />
                    </NavbarRight>
                </NavContainer>
            </div> 
        )
    }
}

export default Navigation