import React, { useState,useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function AddActivity({ show, handleClose, addActivity }) {
  const [validated, setValidated] = useState(false);
  const getDefaultDeadline = () => {
    const now = new Date();
    now.setHours(23, 59, 0, 0);
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const [activityData, setActivityData] = useState({
    name: '',
    minScore: '',
    maxScore: '',
    description: '',
    deadline: getDefaultDeadline() 
  });

 // Resetovat stav aktivit při změně propu show na true
  useEffect(() => {
    if (show) {
      setActivityData({
        name: '',
        minScore: '',
        maxScore: '',
        description: '',
        deadline: getDefaultDeadline() 
      });
      setValidated(false);
    }
  }, [show]);

  const isDeadlineValid = (deadline) => {
    const selectedDate = new Date(deadline);
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Resetovať čas na začiatok dňa
    return selectedDate >= now;
  };

  const isFormValid = () => {
    const { name, description, minScore, maxScore, deadline } = activityData;
    if (name.length < 1 || name.length > 255) return false;
    if (description.length < 1 || description.length > 1000) return false;
    if (isNaN(minScore) || isNaN(maxScore)) return false;
    if (minScore < 0 || minScore > 100 || maxScore < 1 || maxScore > 100) return false;
    if (minScore >= maxScore) return false;
    if (!isDeadlineValid(deadline)) return false;
    return true;
  };

  const handleAddActivity = (e) => {

    e.preventDefault();
    setValidated(true);

    if (!isFormValid()) {
      return;
    };

    const newActivity = {
      name: activityData.name,
      minScore: Number(activityData.minScore),
      maxScore: Number(activityData.maxScore),
      description: activityData.description,
      deadline: activityData.deadline
    };
    addActivity(newActivity);
    handleClose("activity");
};
  
const setField = (name, val) => {
  setActivityData((prevState) => {
    const value = (name === 'minScore' || name === 'maxScore') ? Number(val) : val;
    return { ...prevState, [name]: value };
  });
};
  
return (
    <Modal show={show} onHide={() => handleClose("activity")}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Activity</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleAddActivity}>
          <Form.Group controlId="formActivityName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={activityData.name}
              onChange={(e) => setField("name", e.target.value)}
              isInvalid={validated && (activityData.name.length < 1 || activityData.name.length > 255)}
            />
            <Form.Control.Feedback type="invalid"> 
              The name must be 1–255 characters long.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formActivityDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={activityData.description}
              onChange={(e) => setField("description", e.target.value)}
              isInvalid={validated && (activityData.description.length < 1 || activityData.description.length > 1000)}
            />
            <Form.Control.Feedback type="invalid"> 
              The description must be 1–1000 characters long.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formActivityMinScore">
            <Form.Label>Min Score</Form.Label>
            <Form.Control
              type="number"
              name="minScore"
              value={activityData.minScore}
              onChange={(e) => setField("minScore", e.target.value)}
              isInvalid={validated && (isNaN(activityData.minScore) || activityData.minScore < 0 || activityData.minScore > 100 || activityData.minScore >= activityData.maxScore)}
            />
            <Form.Control.Feedback type="invalid"> 
              The minimum score must be a number between 0-100 and must be less than the maximum score.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formActivityMaxScore">
            <Form.Label>Max Score</Form.Label>
            <Form.Control
              type="number"
              name="maxScore"
              value={activityData.maxScore}
              onChange={(e) => setField("maxScore", e.target.value)}
              isInvalid={validated && (isNaN(activityData.maxScore) || activityData.maxScore < 1 || activityData.maxScore > 100 || activityData.maxScore <= activityData.minScore)}
            />
            <Form.Control.Feedback type="invalid"> 
              The maximum score must be a number between 1-100 and must be greater than the minimum score.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formActivityDeadline">
            <Form.Label>Deadline</Form.Label>
            <Form.Control
              type="datetime-local"
              name="deadline"
              value={activityData.deadline}
              onChange={(e) => setField("deadline", e.target.value)}
              isInvalid={validated && !isDeadlineValid(activityData.deadline)}
            />
            <Form.Control.Feedback type="invalid"> 
              The entered date must be today or later.
            </Form.Control.Feedback>
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