import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import SubjectDetails from "./SubjectDetails";

function SubjectDetailsModal({ show, onHide, subjectDetails, loggedInUser }) {
  if (!subjectDetails || !subjectDetails.subjectId) {
    return (
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>Subject details not found.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  // Check if loggedInUser exists and has a role property
  const userRole = loggedInUser?.role || '';

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Subject Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Pass loggedInUser prop to SubjectDetails component */}
        <SubjectDetails subjectId={subjectDetails.subjectId} loggedInUser={loggedInUser} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        {/* Render additional buttons based on user role */}
        {userRole === 'teacher' && (
          <Button variant="primary">Add Assignment</Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default SubjectDetailsModal;
