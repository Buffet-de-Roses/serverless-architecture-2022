import React from 'react';
import '../styles/Header.css';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Navbar bg="light" expand="lg">
        <LinkContainer to="/">
          <Navbar.Brand>Serverless-architecture</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto mb-2 mb-lg-0">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
              <Nav.Link>About</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/contact">
              <Nav.Link>Contact</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/profil">
              <Nav.Link>Profil</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/signup">
              <Nav.Link>SignUp</Nav.Link>
            </LinkContainer>
            {/* <Navbar.Collapse id="navbar-light-example">
              <Nav>
                <NavDropdown
                  id="nav-dropdown-light-example"
                  title="Account"
                  menuVariant="light"
                >
                  <NavDropdown.Item>
                    <LinkContainer to="/signup">
                      <Nav.Link>SignUp</Nav.Link>
                    </LinkContainer>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item>
                    <LinkContainer to="/signin">
                      <Nav.Link>Signin</Nav.Link>
                    </LinkContainer>
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse> */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}