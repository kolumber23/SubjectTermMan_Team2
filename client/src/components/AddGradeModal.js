// AddGradeModal.js
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function AddGradeModal({ show, onHide, addGrade }) {
  const [student, setStudent] = useState("");
  const [grade, setGrade] = useState("");

  const handleAddGrade = () => {
    addGrade({ student, grade });
    setStudent(""); // Clear the input fields after adding grade
    setGrade("");
    onHide(); // Hide the modal
  };

  return (
    <Modal show={show} onHide={onHide}>
  <Modal.Header closeButton>
    <Modal.Title>Add Grade</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <input
      type="text"
      value={student}
      onChange={(e) => setStudent(e.target.value)}
      placeholder="Enter student name"
    />
    <input
      type="text"
      value={grade}
      onChange={(e) => setGrade(e.target.value)}
      placeholder="Enter grade"
    />
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={onHide}>
      Cancel
    </Button>
    <Button variant="primary" onClick={handleAddGrade}>
      Add
    </Button>
  </Modal.Footer>
</Modal>

  );
}

export default AddGradeModal;
