import {Collapse, Container, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from "reactstrap";
import { Link } from 'react-router-dom';
import {useState} from "react";

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

  return (
      <Navbar color="success" dark expand="md" className="sticky-top">
          <Container>
              <NavbarBrand tag={Link} to="/">
                  <img src="/images/logo.png" alt="logo" width="80" className="me-2" />

                      Army Leader's Book App :
                      Endorsed by leaders, built for the field
              </NavbarBrand>
              <NavbarToggler
                   onClick={toggle}
              />
              <Collapse isOpen={isOpen} navbar>
                  <Nav className="me-auto" navbar>
                      <NavItem>
                          <NavLink tag={Link} to="/">Home</NavLink>
                      </NavItem>
                      <NavItem>
                          <NavLink tag={Link} to="/Admin">Admin</NavLink>
                      </NavItem>
                      <NavItem>
                          <NavLink tag={Link} to="/Profiles">Profiles</NavLink>
                      </NavItem>
                  </Nav>
                  <Nav navbar>
                      <NavItem>
                          <NavLink tag={Link} to="/Profiles">FAQ</NavLink>
                      </NavItem>
                  </Nav>
              </Collapse>
          </Container>
      </Navbar>
  )
}
export default NavBar;