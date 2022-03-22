import React, { Fragment } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  let isAdmin;
  let isManager;
  if (user) {
    const { roles } = user;
    isAdmin = roles.name === "Administrator";
    isManager = roles.name === "Manager";
  }

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <Fragment>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">
            <img
              src={process.env.PUBLIC_URL + "/assets/images/pet-spa-logo.png"}
              alt="Logo Pet Spa"
              height={80}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/stores">Stores</Nav.Link>
              <Nav.Link href="/reservations">Reservations</Nav.Link>
              {user ? (
                <>
                  {isAdmin ? (
                    <NavDropdown title="Admin" id="basic-nav-dropdown">
                      <NavDropdown.Item href="/admin/services">
                        Services
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/admin/users">
                        Users
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/admin/stores">
                        Stores
                      </NavDropdown.Item>
                    </NavDropdown>
                  ) : null}
                  {isManager ? (
                    <NavDropdown title="Manager" id="basic-nav-dropdown">
                      <NavDropdown.Item href="/managers">
                        Reservations
                      </NavDropdown.Item>
                    </NavDropdown>
                  ) : null}
                </>
              ) : null}
            </Nav>
            <Nav>
              {user ? (
                <Nav.Link onClick={onLogout}>
                  <FaSignOutAlt /> Logout
                </Nav.Link>
              ) : (
                <>
                  <Nav.Link href="/login">Login</Nav.Link>
                  <Nav.Link href="/register">Register</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Fragment>
  );
};

export default Header;
