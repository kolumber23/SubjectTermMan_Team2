import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function AddSubjectTerm({ show, handleClose, addSubjectTerm, subjDetail }) {
  const [subjectTermData, setsubjectTermData] = useState({
    subjectId: subjDetail.id,
    semester: '',
    year: new Date().getFullYear()
  });

  /* const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Validate if the value is negative for maxScore and minScore
    if ((name === 'maxScore' || name === 'minScore') && parseFloat(value) < 0) {
      // If value is negative, set it to 0
      setsubjectTermData({ ...subjectTermData, [name]: 0 });
    } else {
      // Otherwise, update the state normally
      setsubjectTermData({ ...subjectTermData, [name]: value });
    }
  }; */

  const handleAddSubjectTerm = async () => {
    const { semester, year } = subjectTermData;

    const newSubjectTerm = {
      subjectId: subjDetail.id,
      semester: `${semester} ${year}`
    };
    await addSubjectTerm(newSubjectTerm);
    handleClose("subjectTerm");
};
  
const setField = (name, val) => {
  setsubjectTermData((prevData) => {
  return { ...prevData, [name]: val };
  });
};

return (
    <Modal show={show} onHide={() => handleClose("subjectTerm")}>
      <Modal.Header closeButton>
        <Modal.Title>Add New SubjectTerm</Modal.Title>
      </Modal.Header>

      <Modal.Body>
      <Form>
          <Form.Group controlId="formSemester">
            <Form.Label>Semester</Form.Label>
            <Form.Control
              as="select"
              value={subjectTermData.semester}
              onChange={(e) => setField("semester", e.target.value)}
              required
            >
              <option value="">Select semester</option>
              <option value="summer">Summer</option>
              <option value="winter">Winter</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formYear">
            <Form.Label>Year</Form.Label>
            <Form.Control
              as="select"
              value={subjectTermData.year}
              onChange={(e) => setField("year", parseInt(e.target.value))}
              required
            >
              <option value="">Select year</option>
              <option value={new Date().getFullYear()}>{new Date().getFullYear()}</option>
              <option value={new Date().getFullYear() + 1}>{new Date().getFullYear() + 1}</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
          <Button 
            variant="primary" 
            onClick={handleAddSubjectTerm}         
          >
            Add SubjectTerm
          </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddSubjectTerm;
