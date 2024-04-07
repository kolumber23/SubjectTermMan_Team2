// AddAssignment.js

import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const AddAssignment = ({ onAddAssignment }) => {
  const [assignment, setAssignment] = useState({
    title: "",
    description: "",
    dueDate: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAssignment((prevAssignment) => ({
      ...prevAssignment,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddAssignment(assignment);
    // Optionally, you can clear the form fields here
    setAssignment({
      title: "",
      description: "",
      dueDate: ""
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter title"
          name="title"
          value={assignment.title}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter description"
          name="description"
          value={assignment.description}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="formDueDate">
        <Form.Label>Due Date</Form.Label>
        <Form.Control
          type="date"
          placeholder="Select due date"
          name="dueDate"
          value={assignment.dueDate}
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Add Assignment
      </Button>
    </Form>
  );
};

export default AddAssignment;
