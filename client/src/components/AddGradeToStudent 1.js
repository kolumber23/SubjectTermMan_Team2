import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const AddGradeToStudent = ({ onAddGrade }) => {
  const [grade, setGrade] = useState("");

  const handleChange = (e) => setGrade(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddGrade(grade);
    setGrade("");
  };

  return (
    <div style={{ height: "200px", overflowY: "auto" }}>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formGrade">
          <Form.Label>Grade</Form.Label>
          <Form.Control type="text" placeholder="Enter grade" value={grade} onChange={handleChange} />
        </Form.Group>
        <Button variant="primary" type="submit">Add Grade</Button>
      </Form>
    </div>
  );
};

export default AddGradeToStudent;
