import './App.css';
import React, { useState } from "react";
import { Outlet, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "react-bootstrap/Navbar";
import { Button, Nav } from "react-bootstrap/";
import Container from "react-bootstrap/Container";
import Offcanvas from "react-bootstrap/Offcanvas";
import LoginModal from './bricks/LoginModal';

function App() {
  let navigate = useNavigate();
  const [isLoginOpen, setLoginOpen] = useState(false)

  const openModal = () => {
    setLoginOpen(true)
  }
  const closeModal = () => {
    setLoginOpen(false)
  }


  return (
    <div class="App">

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
                <Button
                  onClick={openModal}
                  variant="dark">
                  Login
                </Button>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      <LoginModal isOpen={isLoginOpen} closeModalCallback={closeModal} />
      <Outlet />
    </div>
  );
}

export default App;