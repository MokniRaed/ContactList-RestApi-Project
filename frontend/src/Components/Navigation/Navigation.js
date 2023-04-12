import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Navigation() {
  const authCredentials = useSelector((state)=> state.auth)

  const navigate = useNavigate();
  const linkStyle = {
    textDecoration: "none",
    fontStyle: "bold",
    color: "white",
    cursor: "pointer",
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      {authCredentials.token ? (
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
            <div className="d-flex">
              <div style={{color:'white'}}>
              {authCredentials.user.email}
              </div>
              <Button variant="danger" onClick={() => handleLogout()}>
                Logout
              </Button>
            </div>
          </Container>
        </Navbar>
      ) : (
        ""
      )}
    </>
  );
}

export default Navigation;
