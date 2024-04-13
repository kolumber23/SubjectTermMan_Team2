// SubjectDetailsModal.js

import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import SubjectDetails from "./SubjectDetails";
import AddAssignmentModal from "../components/AddAssignmentModal";
import AddGradeModal from "../components/AddGradeModal";
import AddScoreModal from "../components/AddScoreModal";

function SubjectDetailsModal({ show, onHide, subjectDetails, loggedInUser, addAssignment, addGrade, addScore }) {
  const [showAddAssignmentModal, setShowAddAssignmentModal] = useState(false);
  const [showAddGradeModal, setShowAddGradeModal] = useState(false);
  const [showAddScoreModal, setShowAddScoreModal] = useState(false);
  const [error, setError] = useState("");

  const handleAddAssignment = (assignmentName) => {
    if (!assignmentName.trim()) {
      setError("Assignment name cannot be empty");
      return;
    }
    addAssignment(assignmentName);
    setShowAddAssignmentModal(false);
    setError("");
  };

  const handleAddGrade = ({ student, grade }) => {
    if (!student.trim() || !grade) {
      setError("Student name and grade are required");
      return;
    }
    addGrade({ student, grade });
    setShowAddGradeModal(false);
    setError("");
  };

  const handleAddScore = ({ student, score }) => {
    if (!student.trim() || !score) {
      setError("Student name and score are required");
      return;
    }
    addScore({ student, score });
    setShowAddScoreModal(false);
    setError("");
  };

  return (
    <>
      <Modal show={show} onHide={onHide} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Subject Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <SubjectDetails subjectDetails={subjectDetails} loggedInUser={loggedInUser} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          {loggedInUser?.role === 'teacher' && (
            <>
              <Button variant="primary" onClick={() => setShowAddAssignmentModal(true)}>
                Add Assignment
              </Button>
              <Button variant="primary" onClick={() => setShowAddGradeModal(true)}>
                Add Grade
              </Button>
              <Button variant="primary" onClick={() => setShowAddScoreModal(true)}>
                Add Score
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
      <AddAssignmentModal
        show={showAddAssignmentModal}
        onHide={() => setShowAddAssignmentModal(false)}
        addAssignment={handleAddAssignment} // Pass handleAddAssignment instead
      />
      <AddGradeModal
        show={showAddGradeModal}
        onHide={() => setShowAddGradeModal(false)}
        addGrade={handleAddGrade} // Pass handleAddGrade instead
      />
      <AddScoreModal
        show={showAddScoreModal}
        onHide={() => setShowAddScoreModal(false)}
        addScore={handleAddScore} // Pass handleAddScore instead
      />
    </>
  );
}

export default SubjectDetailsModal;
