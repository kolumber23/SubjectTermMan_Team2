// AddScoreToStudent.js

import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const AddScoreToStudent = ({ onAddScore }) => {
  const [score, setScore] = useState("");

  const handleChange = (e) => {
    setScore(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddScore(score);
    setScore(""); // Clear the input field after submission
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formScore">
        <Form.Label>Score</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter score"
          value={score}
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Add Score
      </Button>
    </Form>
  );
};

export default AddScoreToStudent;
