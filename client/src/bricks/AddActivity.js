import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function AddActivity({ show, handleClose, addActivity }) {
  const [activityData, setActivityData] = useState({
    name: '',
    minScore: '',
    maxScore: '',
    description: "",
    deadline: ''
  });

  const handleAddActivity = () => {

    const newActivity = {
      name: activityData.name,
      minScore: activityData.minScore,
      maxScore: activityData.maxScore,
      description: activityData.description,
      deadline: activityData.deadline
    };
    addActivity(newActivity);
    handleClose("activity");
  };

  const setField = (name, val) => {
    setActivityData((activityData) => {
      return { ...activityData, [name]: val };
    });
  };

  return (
    <Modal show={show} onHide={() => handleClose("activity")}>
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
              value={activityData.description}
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
              onChange={(e) => {
                let newMinimum = parseInt(e.target.value, 10);
                if (newMinimum >= activityData.maxScore) {
                  newMinimum = parseInt(activityData.maxScore, 10) - 1;
                };
                if (newMinimum < 0) {
                  newMinimum = 0;
                }
                setField("minScore", newMinimum)
              }
              }
              required
            />
          </Form.Group>
          <Form.Group controlId="formActivityMaxScore">
            <Form.Label>Max Score</Form.Label>
            <Form.Control
              type="number"
              name="maxScore"
              value={activityData.maxScore}
              onChange={(e) => {
                let newMaximum = parseInt(e.target.value, 10);
                if (newMaximum <= activityData.minScore) {
                  newMaximum = parseInt(activityData.minScore, 10) + 1;
                };
                if (newMaximum < 0) {
                  newMaximum = 0;
                }
                setField("maxScore", newMaximum)
              }
              }
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
