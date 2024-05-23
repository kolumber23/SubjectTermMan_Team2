import './App.css';
import React, { useContext, useState } from "react";
import { Outlet, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "react-bootstrap/Navbar";
import { Button, Nav, NavDropdown } from "react-bootstrap/";
import Container from "react-bootstrap/Container";
import Offcanvas from "react-bootstrap/Offcanvas";
import UserContext from "./AuthProvider";
import Login from "./bricks/Login";


function App() {
  let navigate = useNavigate();
  const {user, users, logout} = useContext(UserContext);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };

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

              <Navbar.Brand>{user ? user.surname : "Unregistred"} </Navbar.Brand>
                {/* <NavDropdown 
                  title={user ? user.surname : "Unregistred"} 
                  id={"nav-dropdown-dark"}
                  menuVariant={"dark"}
                >
                  {users
                    .sort((a, b) => a.surname.localeCompare(b.surname))
                    .map((user) => {
                      return (
                        <NavDropdown.Item onClick={() => changeUser(user.id)}>
                          {user.surname} {" "} {user.name}
                        </NavDropdown.Item>
                      )
                  })}
                </NavDropdown> */}

                <Nav.Link href="/student">  Students  </Nav.Link>
                <Nav.Link href="/subject">  Subjects   </Nav.Link>

                {user && <Button
                  variant={"dark"}
                  style={{ marginLeft: "20px" }}
                  onClick={logout}
                >
                  Log out
                </Button>}
                {!user && <Button
                  variant={"dark"}
                  style={{ marginLeft: "20px" }}
                  onClick={() => setShow(true)}
                >
                  Login
                </Button>}

                <Login
                  show={show}
                  handleClose={handleClose}
                />

              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

      <Outlet />
    </div>
  );
}

export default App;