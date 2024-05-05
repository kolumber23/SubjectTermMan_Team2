import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function AddActivity({ show, handleClose, addActivity }) {
  const [activityData, setActivityData] = useState({
    name: '',
    minScore: '',
    maxScore: '',
    description: "",
    deadline: '' // Add deadline field to state
  });

  /* const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Validate if the value is negative for maxScore and minScore
    if ((name === 'maxScore' || name === 'minScore') && parseFloat(value) < 0) {
      // If value is negative, set it to 0
      setActivityData({ ...activityData, [name]: 0 });
    } else {
      // Otherwise, update the state normally
      setActivityData({ ...activityData, [name]: value });
    }
  }; */

  const handleAddActivity = () => {
    
   /*  setItemError(null);

    if (formData.item.length < 2 || formData.item.length > 50) {
      setItemError(t("The item name must be 2 - 50 characters long."));
      return;
    }; */

    const newActivity = {
      name: activityData.name,
      minScore: activityData.minScore,
      maxScore: activityData.maxScore,
      description: activityData.description,
      deadline: activityData.deadline
    };
    addActivity(newActivity);
    handleClose();
};
  
const setField = (name, val) => {
  setActivityData((activityData) => {
  return { ...activityData, [name]: val };
  });
};

  /* const handleAddActivity = (e) => {
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
  }; */
  
  

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Activity</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group controlId="formActivityName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={activityData.name}
              onChange={(e) => setField("name", e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formActivityDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={activityData.name}
              onChange={(e) => setField("description", e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formActivityMinScore">
            <Form.Label>Min Score</Form.Label>
            <Form.Control
              type="number"
              name="minScore"
              value={activityData.minScore}
              onChange={(e) => setField("minScore", e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formActivityMaxScore">
            <Form.Label>Max Score</Form.Label>
            <Form.Control
              type="number"
              name="maxScore"
              value={activityData.maxScore}
              onChange={(e) => setField("maxScore", e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formActivityDeadline"> {/* Add deadline form group */}
            <Form.Label>Deadline</Form.Label>
            <Form.Control
              type="datetime-local" // Use datetime-local input for deadline
              name="deadline"
              value={activityData.deadline}
              onChange={(e) => setField("deadline", e.target.value)}
              required
            />
          </Form.Group>
          
        </Form>
      </Modal.Body>
      <Modal.Footer>
          <Button 
            variant="primary" 
            onClick={handleAddActivity}         
          >
            Add Activity
          </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddActivity;
