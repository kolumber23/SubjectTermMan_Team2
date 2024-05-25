import React, { useState, useContext } from "react";
import { Modal, Button, Table, Form } from 'react-bootstrap';
import UserContext from "../AuthProvider";

function ActivityDetail({ activity, subjectTerm, onClose, updateSubjectTerm, calculateTotalSubjectTermScore }) {
    const [validated, setValidated] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const { users } = useContext(UserContext);

    // Filter users enrolled in the selected activity
    const enrolledUsers = users.filter(user =>
        subjectTerm.studentList.some(student => {
            return student.studentId === user.id &&
                student.scoreList.some(scoreEntry => scoreEntry.activityId === activity.id)
        }
        )
    );

    const [studentScores, setStudentScores] = useState(() => {
        const initialScores = {};
        enrolledUsers.forEach(user => {
            const userScore = subjectTerm.studentList.find(student => student.studentId === user.id).scoreList.find(scoreEntry => scoreEntry.activityId === activity.id).score;
            initialScores[user.id] = userScore;
        });
        return initialScores;
    });

    const calculateGrade = (student) => {
        const ratio = calculateSuccessRatio(student.studentId);
        let grade = 0;
        if (ratio < 60) grade = 0;
        else if (ratio >= 60 && ratio < 75) grade = 3;
        else if (ratio >= 75 && ratio < 88) grade = 2;
        else if (ratio >= 88) grade = 1;
        return grade;
      };

    const calculateSuccessRatio = (studentId) => {
        const totalAchievedScore = calculateTotalAchievedScore(studentId);
        const totalScore = calculateTotalSubjectTermScore();
        const successRatio = (totalAchievedScore / totalScore) * 100;
        return Math.round(successRatio);
      };

    const calculateTotalAchievedScore = (studentId) => {
        const student = subjectTerm.studentList?.find(student => student.studentId === studentId);
        if (student && student.scoreList) {
          let totalAchievedScore = 0;
          student.scoreList.forEach(score => { totalAchievedScore += score.score });
          return totalAchievedScore;
        } else {
          return 0;
        }
      };

    const setScore = (userId, score) => {
        setStudentScores(prevScores => ({
            ...prevScores,
            [userId]: Number(score)
        }));
    };

    const onSave = async () => {
        const errors = {};
        let isValid = true;

        enrolledUsers.forEach(user => {
            const score = studentScores[user.id];
            if (score < activity.minScore || score > activity.maxScore) {
                isValid = false;
                errors[user.id] = `The entered score must be between ${activity.minScore} and ${activity.maxScore}.`;
            }
        });

        setValidationErrors(errors);

        if (!isValid) {
            setValidated(true);
            return;
        }

        try {
            const updatedSubjectTerm = { ...subjectTerm };
            enrolledUsers.forEach(user => {
                if (studentScores[user.id] || studentScores[user.id] === 0) {
                    const student = subjectTerm.studentList
                        .map((student, id) => { return { ...student, index: id } })
                        .find(student => student.studentId === user.id);
                    const activityEntry = student.scoreList
                        .map((scoreEntry, id) => { return { ...scoreEntry, index: id } })
                        .find(scoreEntry => scoreEntry.activityId === activity.id);
                    updatedSubjectTerm.studentList[student.index].scoreList[activityEntry.index] = {
                        ...activityEntry,
                        score: studentScores[user.id],
                        index: undefined,
                    };
                    updatedSubjectTerm.studentList[student.index].grade = calculateGrade(student);
                }
            });
            updateSubjectTerm(updatedSubjectTerm);
        } catch (error) {
            console.error(error);
            return;
        }
        onClose();
    };

    return (
        <Modal show={true} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title><b style={{ fontSize: '1.2em' }}>{activity.name}</b></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    Min Score: {activity.minScore} {" "}
                    Max Score: {activity.maxScore}
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
                        {enrolledUsers.map(user => {
                            const userScore = studentScores[user.id];
                            return (
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.surname}</td>
                                    <td>
                                    <Form noValidate validated={validated} onSubmit={onSave}>
                                        <Form.Control
                                            type="number"
                                            value={userScore}
                                            onChange={(e) => setScore(user.id, e.target.value) }
                                            isInvalid={validated && !!validationErrors[user.id]}
                                        />
                                        <Form.Control.Feedback type="invalid"> 
                                            {validationErrors[user.id]}
                                        </Form.Control.Feedback>
                                    </Form>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="primary" style={{ marginLeft: "8px" }} onClick={onSave} >
                    Save
                </Button>
                <Button variant="outline-secondary" style={{ marginLeft: "8px" }} onClick={onClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ActivityDetail;