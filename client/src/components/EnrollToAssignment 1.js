// EnrollToAssignment.js

import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const EnrollToAssignment = ({ onEnroll }) => {
  const [assignmentId, setAssignmentId] = useState("");

  const handleChange = (e) => {
    setAssignmentId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEnroll(assignmentId);
    setAssignmentId(""); // Clear the input field after submission
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formAssignmentId">
        <Form.Label>Assignment ID</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter assignment ID"
          value={assignmentId}
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Enroll
      </Button>
    </Form>
  );
};

export default EnrollToAssignment;
