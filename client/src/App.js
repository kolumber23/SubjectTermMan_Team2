import './App.css';
import React, { useContext } from "react";
import { Outlet, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "react-bootstrap/Navbar";
import { Button, Nav, NavDropdown } from "react-bootstrap/";
import Container from "react-bootstrap/Container";
import Offcanvas from "react-bootstrap/Offcanvas";
import UserContext from "./Provider";


function App() {
  let navigate = useNavigate();
  const {user, users, changeUser} = useContext(UserContext);

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
                
                <NavDropdown 
                  title={user ? user.name : "Unregistred"} 
                  id={"nav-dropdown-dark"}
                  menuVariant={"dark"}
                >
                  {users
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((user) => {
                      return (
                        <NavDropdown.Item onClick={() => changeUser(user.id)}>
                          {user.name}
                        </NavDropdown.Item>
                      )
                  })}
                </NavDropdown>
                
                <Nav.Link href="/student">  Students  </Nav.Link>
                <Nav.Link href="/subject">  Subjects   </Nav.Link>

                <Button 
                  variant={"dark"}
                  style={{ marginLeft: "20px" }}
                  onClick={() => changeUser(null)}
                >
                  Log out
                </Button>

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