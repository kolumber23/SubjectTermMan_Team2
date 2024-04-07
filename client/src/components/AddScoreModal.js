// AddScoreModal.js
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function AddScoreModal({ show, onHide, addScore }) {
  const [student, setStudent] = useState("");
  const [score, setScore] = useState("");

  const handleAddScore = () => {
    addScore({ student, score });
    setStudent(""); // Clear the input fields after adding score
    setScore("");
    onHide(); // Hide the modal
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add Score</Modal.Title>
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
          value={score}
          onChange={(e) => setScore(e.target.value)}
          placeholder="Enter score"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleAddScore}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddScoreModal;
