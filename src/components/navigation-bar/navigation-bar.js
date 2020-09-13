import React, { useContext } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import styles from "./navigation-bar.module.css";
import { AuthContext } from "../../contexts/auth";

const NavigationBar = () => {
  const { token } = useContext(AuthContext);

  return (
    <Navbar bg="light" expand="lg" className={styles.navbar}>
      <Navbar.Brand>Ask.it</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to="/" exact>
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          {token && (
            <LinkContainer to="/my-questions">
              <Nav.Link>My Questions</Nav.Link>
            </LinkContainer>
          )}
          {token && (
            <LinkContainer to="/profile">
              <Nav.Link>Profile</Nav.Link>
            </LinkContainer>
          )}
        </Nav>
        {token ? (
          <Nav>
            <Nav.Link>Logout</Nav.Link>
          </Nav>
        ) : (
          <Nav>
            <LinkContainer to="/login">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/register">
              <Nav.Link>Register</Nav.Link>
            </LinkContainer>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
