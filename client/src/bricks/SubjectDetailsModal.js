import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import SubjectDetails from "./SubjectDetails";
import AddAssignmentModal from "../components/AddAssignmentModal"; // Import AddAssignmentModal
import AddGradeModal from "../components/AddGradeModal"; // Import AddGradeModal
import AddScoreModal from "../components/AddScoreModal"; // Import AddScoreModal

function SubjectDetailsModal({ show, onHide, subjectDetails, loggedInUser }) {
  const [showAddAssignmentModal, setShowAddAssignmentModal] = useState(false);
  const [showAddGradeModal, setShowAddGradeModal] = useState(false);
  const [showAddScoreModal, setShowAddScoreModal] = useState(false);

  const handleAddAssignment = (assignmentName) => {
    if (!subjectDetails.assignments) {
      // Initialize assignments array if it's undefined
      subjectDetails.assignments = [];
    }
    // Add the assignment to subject details
    subjectDetails.assignments.push(assignmentName);
  };
  
  const handleAddGrade = ({ student, grade }) => {
    if (!subjectDetails.grades) {
      // Initialize grades array if it's undefined
      subjectDetails.grades = [];
    }
    // Add the grade to subject details
    subjectDetails.grades.push({ student, grade });
  };
  
  const handleAddScore = ({ student, score }) => {
    if (!subjectDetails.scores) {
      // Initialize scores array if it's undefined
      subjectDetails.scores = [];
    }
    // Add the score to subject details
    subjectDetails.scores.push({ student, score });
  };
  

  return (
    <>
      <Modal show={show} onHide={onHide} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Subject Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
        addAssignment={handleAddAssignment}
      />
      <AddGradeModal
        show={showAddGradeModal}
        onHide={() => setShowAddGradeModal(false)}
        addGrade={handleAddGrade}
      />
      <AddScoreModal
        show={showAddScoreModal}
        onHide={() => setShowAddScoreModal(false)}
        addScore={handleAddScore}
      />
    </>
  );
}

export default SubjectDetailsModal;
