import React, { useContext } from 'react'
import { Container, Navbar, NavItem, NavLink } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import {UserContext} from "../context/UserContext"

function Nav() {

    const [user, setUser]= useContext(UserContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("token")
        setUser({ data: null, error: null, loading: false})
        navigate("/")
    }

  return (
    <Navbar bg="light">
        <Container >
            <NavItem >
                <Link to={"/"} className="nav-link"> Home </Link>
            </NavItem>

        {user.data?.email &&
            <>
            <NavItem>
                {user.data.email}
            </NavItem>
            <NavItem>
                <NavLink onClick={handleLogout}> Logout </NavLink>
            </NavItem>
            </>
        }
        </Container>
    </Navbar>
  )
}

export default Nav