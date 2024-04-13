import React, {useState} from "react";
import { Modal, Button, Table } from 'react-bootstrap';
import AssignmentDetail from "./AssignmentDetail";

function SubjectDetail({ subjDetail, subjectTermL, assigmentL, onClose }) {
  const [selectedAssignment, setSelectedAssignment] = useState(null);

    // Funkcia na získanie termínov predmetu pre daný predmet
  const getSubjectTerms = () => {
    return subjectTermL.filter(term => subjDetail.subjectTermList.includes(term.subjectTermId));
  };

  // Funkcia na získanie priradení pre daný predmet
  const getAssignments = () => {
    return assigmentL.filter(assignment => subjDetail.subjectTermList.includes(assignment.subjectTermId));
  };

  const subjectTerms = getSubjectTerms();
  const assignments = getAssignments();

  return (
    <>
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title><b style={{ fontSize: '1.2em' }}>{subjDetail.name}</b></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          Credits: {subjDetail.credits}
        </div>
      <br />
        <Table striped bordered>
          <thead>
            <tr>
              <th> Activity </th>
              <th> Min Score </th>
              <th> Max Score </th>
              <th> Detail </th>
            </tr>
          </thead>
          <tbody>
              {assignments.map((assignment, index) => (
                <tr key={assignment.assignmentId}>
                  <td>{assignment.name}</td>
                  <td>{assignment.minScore}</td>
                  <td>{assignment.maxScore}</td>
                  <td>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => setSelectedAssignment(assignment)} // Nastaviť vybranú úlohu
                    >
                      Detail
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          
        </Table>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" style={{ marginLeft: "8px" }}>
          Add Activity
        </Button>
        <Button variant="primary" style={{ marginLeft: "8px" }}>
          Add Student
        </Button>
        <Button variant="outline-secondary" style={{ marginLeft: "8px" }} onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>

    </Modal>

  {selectedAssignment && (
    <AssignmentDetail
      assignment={selectedAssignment}
      subjectTerms={subjectTerms}
      onClose={() => setSelectedAssignment(null)}
    />
  )}

    </>   
  );
}

export default SubjectDetail;
