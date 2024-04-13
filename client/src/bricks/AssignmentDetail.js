import React, {useState, useContext} from "react";
import { Modal, Button, Table, Form } from 'react-bootstrap';
import UserContext from "../Provider";


function AssignmentDetail({ assignment, subjectTerms, onClose }) {
    const {studentL} = useContext(UserContext);

    const [studentScores, setStudentScores] = useState(() => {
        const initialScores = {};
    
    // Pre každého študenta inicializujte skóre na základe údajov zo subjectTermL
    subjectTerms.forEach(term => {
        term.studentList.forEach(studentEntry => {
          const studentId = Object.keys(studentEntry)[0];
          const studentScoresForTerm = studentEntry[studentId];
          
          studentScoresForTerm.forEach(scoreEntry => {
            const assignmentId = Object.keys(scoreEntry)[0];
            const score = scoreEntry[assignmentId];
            if (!initialScores[studentId]) {
              initialScores[studentId] = {};
            }
            initialScores[studentId][assignmentId] = score;
          });
        });
      });

      return initialScores;
    });

    const setScore = (studentId, assignmentId, score) => {
        setStudentScores(prevScores => ({
          ...prevScores,
          [studentId]: {
            ...prevScores[studentId],
            [assignmentId]: score
          }
        }));
      };
  
  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title><b style={{ fontSize: '1.2em' }}>{assignment.name}</b></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          Min Score: {assignment.minScore}
          Max Score: {assignment.maxScore}
        </div>
      <br />
        <div>List of enrolled students</div>
        <Table striped bordered>
          <thead>
            <tr>
              <th> Name </th>
              <th> Surname </th>
              <th> Score </th>
            </tr>
          </thead>
          <tbody>
            {studentL.map(student => (
              <tr key={student.studentId}>
                <td>{student.name}</td>
                <td>{student.surname}</td>
                <td>
                <Form.Control
                    type="number"
                    value={studentScores[student.studentId]?.[assignment.assignmentId] || ""}
                    onChange={(e) => setScore(student.studentId, assignment.assignmentId, e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>  
        </Table>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" style={{ marginLeft: "8px" }}>
          Save
        </Button>
        <Button variant="outline-secondary" style={{ marginLeft: "8px" }} onClick={onClose}>
          Close
        </Button>
        
      </Modal.Footer>
    </Modal>
  );
}

export default AssignmentDetail;
