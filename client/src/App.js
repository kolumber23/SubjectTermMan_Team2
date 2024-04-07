// App.js
import './App.css';
import React, { useState } from "react";
import { Outlet, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import Offcanvas from "react-bootstrap/Offcanvas";
import Icon from '@mdi/react';
import { mdiMoonWaningCrescent } from '@mdi/js';
import SubjectList from "./bricks/SubjectList"; // Import SubjectList component
import SubjectDetails from "./bricks/SubjectDetails"; // Import SubjectDetails component
import AddAssignmentModal from "./components/AddAssignmentModal"; // Import AddAssignmentModal component
import AddGradeModal from "./components/AddGradeModal"; // Import AddGradeModal component
import AddScoreModal from "./components/AddScoreModal"; // Import AddScoreModal component

function App() {
  const navigate = useNavigate();
  const [showAddAssignmentModal, setShowAddAssignmentModal] = useState(false);
  const [showAddGradeModal, setShowAddGradeModal] = useState(false);
  const [showAddScoreModal, setShowAddScoreModal] = useState(false);

  const handleAddAssignment = (assignmentName) => {
    // Implement logic to add assignment
    console.log("Adding assignment:", assignmentName);
    setShowAddAssignmentModal(false); // Hide the modal after adding assignment
  };

  const handleAddGrade = ({ student, grade }) => {
    // Implement logic to add grade
    console.log("Adding grade:", student, grade);
    setShowAddGradeModal(false); // Hide the modal after adding grade
  };

  const handleAddScore = ({ student, score }) => {
    // Implement logic to add score
    console.log("Adding score:", student, score);
    setShowAddScoreModal(false); // Hide the modal after adding score
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
          <Navbar.Brand onClick={() => navigate("/")}>uuSubjectTermMan</Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`} />
          <Navbar.Offcanvas id={`offcanvasNavbar-expand-sm`}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}>uuSubjectTermMan</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3 d-flex align-items-center">
                <Nav.Link href="/student">Students</Nav.Link>
                <Nav.Link href="/subject">Subjects</Nav.Link>
                <span className='me-3'></span>
                <NavDropdown title="EN" id="basic-nav-dropdown" noCaret>  
                  <NavDropdown.Item href="#en">English EN</NavDropdown.Item>  
                  <NavDropdown.Item href="#sk">Čeština CZ</NavDropdown.Item>  
                </NavDropdown>
                <span className="me-2"></span>
                <Icon path={mdiMoonWaningCrescent} size={1} color="white"/>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

      {/* Outlet for rendering nested routes */}
      <Outlet />

      {/* Render AddAssignmentModal */}
      <AddAssignmentModal
        show={showAddAssignmentModal}
        onHide={() => setShowAddAssignmentModal(false)}
        addAssignment={handleAddAssignment}
      />

      {/* Render AddGradeModal */}
      <AddGradeModal
        show={showAddGradeModal}
        onHide={() => setShowAddGradeModal(false)}
        addGrade={handleAddGrade}
      />

      {/* Render AddScoreModal */}
      <AddScoreModal
        show={showAddScoreModal}
        onHide={() => setShowAddScoreModal(false)}
        addScore={handleAddScore}
      />
    </div>
  );
}

export default App;
