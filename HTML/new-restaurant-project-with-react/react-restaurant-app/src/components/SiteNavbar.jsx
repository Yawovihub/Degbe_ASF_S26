import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Badge, Container } from 'reactstrap';

const SiteNavbar = ({ cartCount }) => {
  return (
    <Navbar color="dark" dark expand="md" className="sticky-top">
      <Container>
        <NavbarBrand tag={Link} to="/">
          <img src="/images/logo.png" alt="logo" width="80" className="me-2" />
          Coffee Haven
        </NavbarBrand>
        <Nav className="me-auto" navbar>
          <NavItem>
            <NavLink tag={Link} to="/">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/menu">Menu</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to="/reservations">Reservations</NavLink>
          </NavItem>
        </Nav>
        <Nav navbar>
          <NavItem>
            <NavLink tag={Link} to="/cart">
              <i className="fas fa-shopping-cart"></i> Cart
              {cartCount > 0 && (
                <Badge color="danger" pill className="ms-1">
                  {cartCount}
                </Badge>
              )}
            </NavLink>
          </NavItem>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default SiteNavbar;
