import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

function StudentDetailsModal({ show, onHide, studentDetails }) {
  const [activeTab, setActiveTab] = useState("assignments");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  if (!studentDetails) {
    return (
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Student details are not available.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const sortedAssignments = [...studentDetails.assignments].sort((a, b) => a.subject.localeCompare(b.subject));
  const sortedGrades = [...studentDetails.grades].sort((a, b) => a.subject.localeCompare(b.subject));
  const sortedScores = [...studentDetails.scores].sort((a, b) => a.subject.localeCompare(b.subject));

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Student Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Name: {studentDetails.name}</p>
        <p>Surname: {studentDetails.surname}</p>
        <p>Degree: {studentDetails.degree}</p>
        <Nav variant="tabs" defaultActiveKey="assignments">
          <Nav.Item>
            <Nav.Link eventKey="assignments" onClick={() => handleTabChange("assignments")}>Assignments</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="grades" onClick={() => handleTabChange("grades")}>Grades</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="scores" onClick={() => handleTabChange("scores")}>Scores</Nav.Link>
          </Nav.Item>
        </Nav>
        {activeTab === "assignments" && (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Assignment</th>
              </tr>
            </thead>
            <tbody>
              {sortedAssignments.map((assignment, index) => (
                <tr key={index}>
                  <td>{assignment.subject}</td>
                  <td>{assignment.assignment}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        {activeTab === "grades" && (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {sortedGrades.map((grade, index) => (
                <tr key={index}>
                  <td>{grade.subject}</td>
                  <td>{grade.grade}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        {activeTab === "scores" && (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {sortedScores.map((score, index) => (
                <tr key={index}>
                  <td>{score.subject}</td>
                  <td>{score.score}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default StudentDetailsModal;
