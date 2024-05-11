import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function AddSubjectTerm({ show, handleClose, addSubjectTerm, subjDetail,subjTerms }) {
  const [subjectTermData, setsubjectTermData] = useState({
    subjectId: subjDetail.id,
    semester: '',
    year: new Date().getFullYear()
  });

  const handleAddSubjectTerm = () => {
    const { semester, year } = subjectTermData;
    const semesterYear = `${semester} ${year}`;

    // Kontrola existence kombinace roku a semestru
    if (subjTerms.some(term => term.semester === semesterYear)) {
      alert("Subject term already exists for this semester and year.");
      return;
    }
    const newSubjectTerm = {
      subjectId: subjDetail.id,
      semester: `${semester} ${year}`,
      studentList: [],
    };
    addSubjectTerm(newSubjectTerm);
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
              <option value="Summer">Summer</option>
              <option value="Winter">Winter</option>
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
