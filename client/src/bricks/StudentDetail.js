import React, { useContext } from "react";
import { Table, Modal } from 'react-bootstrap';
import SubjContext from "../SubjProvider";
import UserContext from "../Provider";


function StudentDetail({ selectedStudent, onClose }) {
  const { subjectTermL, subjectL } = useContext(SubjContext);
  const { users } = useContext(UserContext);

  const student = users.find((user) => user.id === selectedStudent.id);

  return (
    <Modal show={true} onHide={() => onClose("student")} >
      <Modal.Header closeButton>
        <Modal.Title>{student.name} {" "} {student.surname}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Degree: {student.degree}</p>
       <br />
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Subject</th>
                <th>SubjectTerm</th>
                <th>Score</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
            {subjectTermL.map((subjectTerm) => {
              // Zjistit, zda je vybraný student zapsán do tohoto termínu předmětu
              const studentEntry = subjectTerm.studentList.find((student) => student.studentID === selectedStudent.id);
                if (studentEntry) {
              // Najít odpovídající předmět v subjectL podle subjectID
              const subject = subjectL.find((subj) => subj.id === subjectTerm.subjectID);
              if (subject) {
                // Vypočítat celkové skóre studenta v daném termínu
              const totalScore = studentEntry.scoreList.reduce((acc, curr) => {
                return acc + curr.score;
              }, 0);
      return (
        <tr key={subject.id}>
          <td>{subject.name}</td>
          <td>{subjectTerm.semester}</td>
          <td>{totalScore}</td>
          <td>{studentEntry.grade}</td>
        </tr>
      );
    }
  }
  return null;
})}
          </tbody>
          </Table>
      </Modal.Body>

    </Modal>
  );
}

export default StudentDetail;
