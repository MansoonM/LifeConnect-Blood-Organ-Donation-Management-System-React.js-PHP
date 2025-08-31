import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const NavBarComponent = () => {
  const [expanded, setExpanded] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const handleLinkClick = () => {
    setExpanded(false); // ✅ collapse navbar on link click
  };

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      sticky="top"
      expanded={expanded}
    >
      <Container>
        <Navbar.Brand as={NavLink} to="/home" onClick={handleLinkClick}>
          🩸 Mansoon Donation Platform
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="nav"
          onClick={() => setExpanded(expanded ? false : true)}
        />
        <Navbar.Collapse id="nav">
          <Nav className="ms-auto">
           
{user && user.role === "user" && (
              <Nav.Link as={NavLink} to="/home" onClick={handleLinkClick}>
              Home
              </Nav.Link>
            )}



            {user && user.role === "user" && (
              <Nav.Link as={NavLink} to="/about" onClick={handleLinkClick}>
               About
              </Nav.Link>
            )}
           

            {user && user.role === "user" && (
              <Nav.Link as={NavLink} to="/donor" onClick={handleLinkClick}>
                Become Donor
              </Nav.Link>
            )}

{user && user.role === "user" && (
              <Nav.Link as={NavLink} to="/donors" onClick={handleLinkClick}>
                 Donor
              </Nav.Link>
            )}


            {user && user.role === "user" && (
              <Nav.Link as={NavLink} to="/request" onClick={handleLinkClick}>
                Request
              </Nav.Link>
            )}

            {user && user.role === "user" && (
              <Nav.Link
                as={NavLink}
                to="/my-requests"
                onClick={handleLinkClick}
              >
                My Requests
              </Nav.Link>
            )}

            {user && user.role === "admin" && (
              <Nav.Link
                as={NavLink}
                to="/admin-requests"
                onClick={handleLinkClick}
              >
                Manage Requests
              </Nav.Link>
            )}
            {user && user.role === "admin" && (
              <Nav.Link
                as={NavLink}
                to="/admin-contacts"
                onClick={handleLinkClick}
              >
                Contact Messages
              </Nav.Link>
            )}

            {user && user.role === "user" && (
              <Nav.Link as={NavLink} to="/contact" onClick={handleLinkClick}>
                Contact
              </Nav.Link>
            )}

{ user && user.role === "user" &&(
  <Nav.Link
              onClick={() => {
                handleLogout();
                handleLinkClick();
              }}
              className="text-danger"
            >
              Logout
            </Nav.Link> 
)}


{ user && user.role === "admin" &&(
  <Nav.Link
              onClick={() => {
                handleLogout();
                handleLinkClick();
              }}
              className="text-danger"
            >
              Logout
            </Nav.Link> 
)}
         
            {/* <Nav.Link
              onClick={() => {
                handleLogout();
                handleLinkClick();
              }}
              className="text-danger"
            >
              Logout
            </Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBarComponent;
