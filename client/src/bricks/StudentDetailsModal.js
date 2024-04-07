// StudentDetailsModal.js
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function StudentDetailsModal({ show, onHide, studentDetails }) {
  const [showAssignments, setShowAssignments] = useState(false);
  const [showGrades, setShowGrades] = useState(false);
  const [showScores, setShowScores] = useState(false);

  const handleShowAssignments = () => {
    setShowAssignments(true);
    setShowGrades(false);
    setShowScores(false);
  };

  const handleShowGrades = () => {
    setShowAssignments(false);
    setShowGrades(true);
    setShowScores(false);
  };

  const handleShowScores = () => {
    setShowAssignments(false);
    setShowGrades(false);
    setShowScores(true);
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
          <Button variant="primary" onClick={handleShowAssignments}>
            View Assignments
          </Button>{" "}
          <Button variant="primary" onClick={handleShowGrades}>
            View Grades
          </Button>{" "}
          <Button variant="primary" onClick={handleShowScores}>
            View Scores
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Assignment Modal */}
      <Modal show={showAssignments} onHide={() => setShowAssignments(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Assignments</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Display assignments */}
          {studentDetails.assignments && studentDetails.assignments.map((assignment, index) => (
            <div key={index}>{assignment}</div>
          ))}
        </Modal.Body>
      </Modal>

      {/* Grades Modal */}
      <Modal show={showGrades} onHide={() => setShowGrades(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Grades</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Display grades */}
          {studentDetails.grades && studentDetails.grades.map((grade, index) => (
            <div key={index}>
              {grade.subject}: {grade.grade}
            </div>
          ))}
        </Modal.Body>
      </Modal>

      {/* Scores Modal */}
      <Modal show={showScores} onHide={() => setShowScores(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Scores</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Display scores */}
          {studentDetails.scores && studentDetails.scores.map((score, index) => (
            <div key={index}>
              {score.subject}: {score.score}
            </div>
          ))}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default StudentDetailsModal;
