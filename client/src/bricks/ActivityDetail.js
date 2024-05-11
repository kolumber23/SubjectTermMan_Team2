import React, { useState, useContext } from "react";
import { Modal, Button, Table, Form } from 'react-bootstrap';
import UserContext from "../Provider";

function ActivityDetail({ activity, subjectTerm, onClose, updateSubjectTerm }) {
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

    const setScore = (userId, score) => {
        setStudentScores(prevScores => ({
            ...prevScores,
            [userId]: score
        }));
    };

    const onSave = async () => {
        try {
            const updatedSubjectTerm = { ...subjectTerm };
            enrolledUsers.forEach(user => {
                if (studentScores[user.id] || studentScores[user.id] === 0) {
                    const student = subjectTerm.studentList
                        .map((student, id) => { return { ...student, index: id } })
                        .find(student => student.studentId === user.id)
                    const activityEntry = student.scoreList
                        .map((scoreEntry, id) => { return { ...scoreEntry, index: id } })
                        .find(scoreEntry => scoreEntry.activityId === activity.id)
                    updatedSubjectTerm.studentList[student.index].scoreList[activityEntry.index] = {
                        ...activityEntry,
                        score: studentScores[user.id],
                        index: undefined,
                    };
                }
            });
            updateSubjectTerm(updatedSubjectTerm)
        } catch (error) {
            console.error(error);
            return;
        }
        onClose();

    }

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
                                        <Form.Control
                                            type="number"
                                            max={activity.maxScore}
                                            value={userScore}
                                            onChange={(e) => {
                                                let newScore = parseInt(e.target.value, 10);
                                                if (newScore > activity.maxScore) {
                                                    newScore = parseInt(activity.maxScore, 10);
                                                };
                                                if (newScore < 0) {
                                                    newScore = 0;
                                                }
                                                else if(newScore < activity.minScore){
                                                    if (userScore === 0) {
                                                        newScore = parseInt(activity.minScore, 10);
                                                    }
                                                    else {
                                                        newScore = 0;
                                                    }
                                                }
                                                setScore(user.id, newScore);
                                            }
                                            }
                                        />
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
}

export default ActivityDetail;