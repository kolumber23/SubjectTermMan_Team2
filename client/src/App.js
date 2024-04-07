// App.js
import './App.css';
import React, { useState, createContext } from "react";
import { Outlet, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import Offcanvas from "react-bootstrap/Offcanvas";
import Icon from '@mdi/react';
// eslint-disable-next-line
import { mdiWhiteBalanceSunny, mdiMoonWaningCrescent } from '@mdi/js'; // This import is currently unused
import Login from "./components/Login";
import HomeR from "./routes/HomeR"; // This import is currently unused
import StudentR from "./routes/StudentR"; // This import is currently unused
import SubjectR from "./routes/SubjectR"; // This import is currently unused

// Create a context for managing the authentication state
export const AuthContext = createContext();

function App() {
  let navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false); // State to track login status

  const handleLogin = (username) => {
    // Perform authentication logic
    // For simplicity, let's assume authentication is successful
    setLoggedIn(true);
  };

  const handleLogout = () => {
    // Perform logout logic
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, handleLogin, handleLogout }}>
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
      </div>
    </AuthContext.Provider>
  );
}

export default App;
