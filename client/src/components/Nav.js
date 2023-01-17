import React from 'react'
import { Container, Navbar, NavItem, NavLink } from "react-bootstrap"

function Nav() {

    const handleLogout = ()=> {
        console.log("logout")
    }

  return (
    <Navbar bg="light">
        <Container >
            <NavItem >Home</NavItem>
            
            <NavItem>User xxx</NavItem>
            
            <NavItem> 
                <NavLink onClick={handleLogout}> Logout </NavLink>
            </NavItem>
        
        </Container>
    </Navbar>
  )
}

export default Nav