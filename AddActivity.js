import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function AddActivity({ show, handleClose, handleAddActivity }) {
  const [activityData, setActivityData] = useState({
    name: '',
    minScore: '',
    maxScore: '',
    deadline: '' // Add deadline field to state
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Validate if the value is negative for maxScore and minScore
    if ((name === 'maxScore' || name === 'minScore') && parseFloat(value) < 0) {
      // If value is negative, set it to 0
      setActivityData({ ...activityData, [name]: 0 });
    } else {
      // Otherwise, update the state normally
      setActivityData({ ...activityData, [name]: value });
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Validate input data including the deadline field
    if (
      activityData.name.trim() === '' ||
      isNaN(activityData.minScore) ||
      isNaN(activityData.maxScore) ||
      isNaN(Date.parse(activityData.deadline)) || // Validate if the deadline is a valid date
      parseFloat(activityData.minScore) < 0 ||
      parseFloat(activityData.maxScore) < 0 ||
      parseFloat(activityData.minScore) > parseFloat(activityData.maxScore)
    ) {
      // Display error message or handle invalid data
      console.error('Invalid activity data.');
      return;
    }
  
    // Call handleAddActivity if data is valid
    handleAddActivity(activityData);
  };
  
  

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Activity</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formActivityName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={activityData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formActivityMinScore">
            <Form.Label>Min Score</Form.Label>
            <Form.Control
              type="number"
              name="minScore"
              value={activityData.minScore}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formActivityMaxScore">
            <Form.Label>Max Score</Form.Label>
            <Form.Control
              type="number"
              name="maxScore"
              value={activityData.maxScore}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formActivityDeadline"> {/* Add deadline form group */}
            <Form.Label>Deadline</Form.Label>
            <Form.Control
              type="datetime-local" // Use datetime-local input for deadline
              name="deadline"
              value={activityData.deadline}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <br />
          <Button variant="primary" type="submit">
            Add Activity
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddActivity;