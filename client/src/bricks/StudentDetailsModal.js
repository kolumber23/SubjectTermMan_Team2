import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

function StudentDetailsModal({ show, onHide, studentDetails, addGrade, addAssignment, addScore }) {
  const [activeTab, setActiveTab] = useState("assignments");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleAddAssignment = () => {
    const assignment = prompt("Enter assignment:");
    if (assignment) {
      addAssignment(assignment);
    }
  };

  const handleAddGrade = () => {
    const subject = prompt("Enter subject:");
    const grade = prompt("Enter grade:");
    if (subject && grade) {
      addGrade({ subject, grade });
    }
  };

  const handleAddScore = () => {
    const subject = prompt("Enter subject:");
    const score = prompt("Enter score:");
    if (subject && score) {
      addScore({ subject, score });
    }
  };

  if (!studentDetails) {
    return null;
  }

  return (
    <>
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
                {studentDetails.assignments.map((assignment, index) => (
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
                {studentDetails.grades.map((grade, index) => (
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
                {studentDetails.scores.map((score, index) => (
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
          <Button variant="primary" onClick={handleAddAssignment}>
            Add Assignment
          </Button>
          <Button variant="primary" onClick={handleAddGrade}>
            Add Grade
          </Button>
          <Button variant="primary" onClick={handleAddScore}>
            Add Score
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default StudentDetailsModal;
