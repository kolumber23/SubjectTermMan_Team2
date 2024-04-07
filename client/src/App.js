import React, { useState } from "react";
import { Outlet, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import Offcanvas from "react-bootstrap/Offcanvas";
import Icon from '@mdi/react';
import { mdiWhiteBalanceSunny, mdiMoonWaningCrescent } from '@mdi/js';
import LoginModal from "./components/LoginModal"; // Import the LoginModal component
import './App.css'; // Import CSS file

function App() {
  let navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false); // State to control the visibility of the login modal

  // Function to handle opening the login modal
  const handleLoginButtonClick = () => {
    setShowLoginModal(true);
  };

  // Function to handle closing the login modal
  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  // Function to handle login (not implemented here)
  const handleLogin = () => {
    // Logic for handling login
    // For simplicity, assume successful login
    console.log("Logged in successfully");
    setShowLoginModal(false); // Close the login modal after successful login
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

      {/* Render login button */}
      <button onClick={handleLoginButtonClick}>Login</button>

      {/* Render login modal */}
      <LoginModal show={showLoginModal} onClose={handleCloseLoginModal} onLogin={handleLogin} />
      
      {/* Render components based on routes */}
      <Outlet />
    </div>
  );
}

export default App;
