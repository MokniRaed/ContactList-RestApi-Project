import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

function Navigation() {
  const linkStyle = {
    textDecoration: "none",
    fontStyle: "bold",
    color: "white",
    cursor: "pointer",
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <img
            alt=""
            src="https://cdn.cdnlogo.com/logos/p/61/people-magazine.svg"
            width="80"
            height="50"
            className="d-inline-block align-center"
          />
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link>
            <Link style={linkStyle} to="/">
              Dashboard
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link style={linkStyle} to="/Addcontact">
              {" "}
              Add Contact
            </Link>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Navigation;
