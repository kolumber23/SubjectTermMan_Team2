// SubjectDetailsModal.js
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import SubjectDetails from "./SubjectDetails";
import AddAssignmentModal from "../components/AddAssignmentModal";
import AddGradeModal from "../components/AddGradeModal"; // Import AddGradeModal component

function SubjectDetailsModal({ show, onHide, subjectDetails, loggedInUser }) {
  const [showAddAssignmentModal, setShowAddAssignmentModal] = useState(false);
  const [showAddGradeModal, setShowAddGradeModal] = useState(false); // State for showing AddGradeModal

  const handleAddAssignment = (assignmentName) => {
    // Add the assignment to subject details
    subjectDetails.assignments.push(assignmentName);
  };

  const handleAddGrade = (gradeData) => {
    // Add the grade to subject details
    subjectDetails.grades.push(gradeData);
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
              <Button variant="primary" onClick={() => setShowAddGradeModal(true)}> {/* Button to show AddGradeModal */}
                Add Grade
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
    </>
  );
}

export default SubjectDetailsModal;
