import React, { useContext, useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import UserContext from '../AuthProvider';

function AddSubject({ show, handleClose, addSubject }) {
  const [validated, setValidated] = useState(false);
  const isFormValid = () => {
    const { name, credits, supervisor, goal, degree, language, description, school } = subjectData;
    if (name.length < 1 || name.length > 255) return false;
    if (supervisor.length < 1 || supervisor.length > 255) return false;
    if (goal.length < 1 || goal.length > 255) return false;
    if (school.length < 1 || school.length > 255) return false;
    if (description.length < 1 || description.length > 1000) return false;
    if (language === "" || degree === "") return false;
    if (isNaN(credits)) return false;
    if (credits < 0 || credits > 10) return false;
    return true;
  };

  const [subjectData, setSubjectData] = useState({
    name: "",
    credits: 1,
    supervisor: "",
    goal: "",
    degree: "",
    language:  "",
    description:  "",
    school: "",
  });

  useEffect(() => {
    if (show) {
      setSubjectData({
        name: '',
        credits: 1,
        degree: '',
        supervisor: '',
        goal: '',
        language: '',
        school: '',
        description: ''
      });
      setValidated(false);
    }
  }, [show]);

  const handleAddSubject = (e) => {
    
    e.preventDefault();
    setValidated(true);

    if (!isFormValid()) {
      return;
    };

    const { name, credits, supervisor, goal, degree, language, description, school } = subjectData;

    const newSubject = {
      name: name,
      credits: credits,
      supervisor: supervisor,
      goal: goal,
      degree: degree,
      language: language,
      description: description,
      school: school
    };
    addSubject(newSubject);
    handleClose();
};
  
const setField = (name, val) => {
  setSubjectData((prevData) => {
  return { ...prevData, [name]: val };
  });
};

return (
    <Modal show={show} onHide={() => handleClose()}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Subject</Modal.Title>
      </Modal.Header>

      <Modal.Body>
      <Form>
        <Form.Group controlId="formSubjectName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={subjectData.name}
              onChange={(e) => setField("name", e.target.value)}
              isInvalid={validated && (subjectData.name.length < 1 || subjectData.name.length > 255)}
            />
            <Form.Control.Feedback type="invalid"> 
              The name must be 1–255 characters long.
            </Form.Control.Feedback>
          </Form.Group>
        <Form.Group controlId="formsupervisor">
            <Form.Label>Supervisor</Form.Label>
            <Form.Control
              type="text"
              name="supervisor"
              value={subjectData.supervisor}
              onChange={(e) => setField("supervisor", e.target.value)}
              isInvalid={validated && (subjectData.supervisor.length < 1 || subjectData.supervisor.length > 255)}
            />
            <Form.Control.Feedback type="invalid"> 
              The supervisor must be 1–255 characters long.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={subjectData.description}
              onChange={(e) => setField("description", e.target.value)}
              isInvalid={validated && (subjectData.description.length < 1 || subjectData.description.length > 1000)}
            />
            <Form.Control.Feedback type="invalid"> 
              The description must be 1–1000 characters long.
            </Form.Control.Feedback>
          </Form.Group>
        <Form.Group controlId="formGoal">
            <Form.Label>Goal</Form.Label>
            <Form.Control
              type="text"
              name="goal"
              value={subjectData.goal}
              onChange={(e) => setField("goal", e.target.value)}
              isInvalid={validated && (subjectData.goal.length < 1 || subjectData.goal.length > 255)}
            />
            <Form.Control.Feedback type="invalid"> 
              The goal must be 1–255 characters long.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formDegree">
            <Form.Label>Degree</Form.Label>
            <Form.Control
              as="select"
              value={subjectData.degree}
              onChange={(e) => setField("degree", e.target.value)}
              required
              isInvalid={validated && (subjectData.degree === "")}
            >
              <option value="">Select degree</option>
              <option value="Bc">Bachelor</option>
              <option value="Mgr">Magister</option>
              {/* <option value="Ing">Engineer</option> */}
            </Form.Control>
            <Form.Control.Feedback type="invalid"> 
              The degree must be seleted.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formCredits">
            <Form.Label>Credits</Form.Label>
            <Form.Control
              type="number"
              name="credits"
              value={subjectData.credits}
              onChange={(e) => setField("credits", e.target.value)}
              isInvalid={validated && (isNaN(subjectData.credits) || subjectData.credits < 1 || subjectData.credits > 10)}
            />
            <Form.Control.Feedback type="invalid"> 
              The credits must be a number between 1-10.
            </Form.Control.Feedback>
          </Form.Group>
        <Form.Group controlId="formSchool">
            <Form.Label>School</Form.Label>
            <Form.Control
              type="text"
              name="school"
              value={subjectData.school}
              onChange={(e) => setField("school", e.target.value)}
              isInvalid={validated && (subjectData.school.length < 1 || subjectData.school.length > 255)}
            />
            <Form.Control.Feedback type="invalid"> 
              The school must be 1–255 characters long.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formLanguage">
            <Form.Label>Language</Form.Label>
            <Form.Control
              as="select"
              value={subjectData.language}
              onChange={(e) => setField("language", e.target.value)}
              required
              isInvalid={validated && (subjectData.language === "")}
            >
              <option value="">Select language</option>
              <option value="cz">Czech</option>
              <option value="en">English</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid"> 
              The language must be seleted.
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
          <Button 
            variant="primary" 
            onClick={handleAddSubject}         
          >
            Add Subject
          </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddSubject;