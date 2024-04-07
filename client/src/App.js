// App.js
import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import Offcanvas from "react-bootstrap/Offcanvas";
import Icon from '@mdi/react';
import { mdiWhiteBalanceSunny, mdiMoonWaningCrescent } from '@mdi/js';
import Login from "./components/Login";
import axios from 'axios';
import './App.css'; // Import CSS file

function App() {
  let navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false); // State to track login status

  useEffect(() => {
    // Check if user is already logged in from previous session
    const isLoggedIn = localStorage.getItem("loggedIn");
    if (isLoggedIn) {
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = (username) => {
    // Perform authentication logic
    // For simplicity, let's assume authentication is successful
    localStorage.setItem("loggedIn", "true");
    setLoggedIn(true);
  };

  const handleLogout = () => {
    // Perform logout logic
    localStorage.removeItem("loggedIn");
    setLoggedIn(false);
  };

  // Function to open subject details
  const openSubjectDetails = () => {
    // Navigate to the subject details page
    navigate("/subject-details");
  };

  return (
    <div className="App">
      <Navbar
        fixed="top"
        expand={"sm"}
        className="mb-3"
        bg="dark"
        variant="dark"
      >
        <Container fluid>
          <Navbar.Brand onClick={() => navigate("/")}>  uuSubjectTermMan  </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`} />
          <Navbar.Offcanvas id={`offcanvasNavbar-expand-sm`}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}>
                uuSubjectTermMan
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3 d-flex align-items-center">
                <Nav.Link href="/student">  Students  </Nav.Link>
                <Nav.Link href="/subject">  Subjects   </Nav.Link>
                <span className='me-3'></span>
                <NavDropdown title="EN" id="basic-nav-dropdown" noCaret>
                  <NavDropdown.Item href="#en">English     EN</NavDropdown.Item>
                  <NavDropdown.Item href="#sk">Čeština     CZ</NavDropdown.Item>
                </NavDropdown>
                <span className="me-2"></span>
                <Icon path={mdiMoonWaningCrescent} size={1} color="white"/>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

      {/* Render Login component only if user is not logged in */}
      {!loggedIn && <Login onLogin={handleLogin} />}

      {/* Render components based on routes */}
      <Outlet />

      {/* Button to open subject details */}
      <button onClick={openSubjectDetails}>Open Subject Details</button>
    </div>
  );
}

export default App;
