// AddAssignmentModal.js
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function AddAssignmentModal({ show, onHide, addAssignment }) {
  const [assignmentName, setAssignmentName] = useState("");

  const handleAddAssignment = () => {
    addAssignment(assignmentName);
    setAssignmentName(""); // Clear the input field after adding assignment
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add Assignment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          type="text"
          value={assignmentName}
          onChange={(e) => setAssignmentName(e.target.value)}
          placeholder="Enter assignment name"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleAddAssignment}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddAssignmentModal;
