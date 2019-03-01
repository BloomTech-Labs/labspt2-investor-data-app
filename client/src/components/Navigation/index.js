import React from 'react'
import styled from "styled-components";

const NavContainer = styled.section`
  display: flex; 
  flex-wrap: wrap; 
  align-items: center; 
  justify-content: space-between;  
  padding: 0% 7%;
  background-color: rgba(0, 0, 0, 0.1); 
`
const NavbarRight = styled.div`
  font-weight: 600; 
`

class Navigation extends React.Component {
    constructor(){
        super();
    }
    
    render(){
        return(
            <div>
                <NavContainer>
                    <h2>Pick Em</h2>
                    <NavbarRight>
                        <p>Sign In</p> 
                    </NavbarRight>
                </NavContainer>
            </div> 
        )
    }
}

export default Navigation