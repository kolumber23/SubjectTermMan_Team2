import React, { useState, useEffect, useContext } from "react";
import { Button, Navbar, Table, Tab, Tabs, ProgressBar } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiTrashCanOutline } from "@mdi/js";
import UserContext from "../Provider";
import moment from 'moment';

import AddActivity from "./AddActivity";
import AddSubjectTerm from "./AddSubjectTerm";
import ActivityDetail from "./ActivityDetail";
import StudentDetail from "./StudentDetail"

function SubjectDetail({ subjDetail, subjectTermL, activityL, updateSubjectTerm, createSubjectTerm, createActivity, deleteActivity }) {
  const navigate = useNavigate();
  const { users, user, isLoggedIn } = useContext(UserContext);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedSubjectTerm, setSelectedSubjectTerm] = useState(null);
  const [showAA, setShowAA] = useState(false);
  const [showAST, setShowAST] = useState(false);
  const [deadline, setDeadline] = useState("");
  const [now, setNow] = useState(0);

  // OPEN and CLOSE modal
  const handleOpen = (modal) => {
    switch (modal) {
      case "activity":
        setShowAA(true);
        break;
      case "subjectTerm":
        setShowAST(true);
        break;
      default:
        break;
    }
  };

  const handleClose = (modal) => {
    switch (modal) {
      case "activity":
        setShowAA(false);
        break;
      case "subjectTerm":
        setShowAST(false);
        break;
      default:
        break;
    }
  };

  // SUBJECTTERM
  // ADDIMG subjectTerm
  const handleAddSubjectTerm = (subjectTermData) => {
    createSubjectTerm(subjectTermData)
    setShowAST(false);
  };

  const handleSubjectTermClick = (term) => {
    setSelectedSubjectTerm(term);
    setSelectedActivity(null); // Zrušíme výber aktivity pri zmene subjektu
  };

  // Získanie subjTerms patriacich k predmetu []
  const getSubjectTerms = () => {
    return subjectTermL.filter(term => term.subjectId === subjDetail.id);
  };

  const subjTerms = getSubjectTerms();

  // Načítanie všetkých subjectTerms, ktoré k patria k zobrazenému subject a automaticky zobrazí najnovší  
  useEffect(() => {
    if (subjTerms.length > 0) {
      const sortedSubjectTerms = subjTerms.sort((a, b) => {
        const semesterA = a.semester;
        const semesterB = b.semester;
        
        return semesterB.localeCompare(semesterA);
      });
      if (!selectedSubjectTerm) {
        setSelectedSubjectTerm(sortedSubjectTerms[0]);
      }
      else {
        setSelectedSubjectTerm(subjTerms.find(term => term.id === selectedSubjectTerm.id))
      }
    }
  }, [subjDetail, subjectTermL]);
  
  // ACTIVITY
  // ADDIMG activity
  const handleAddActivity = (activityData) => {
    const activityWithSubjTerm = { ...activityData, subjTermId: selectedSubjectTerm.id };
    createActivity(activityWithSubjTerm)
    setShowAA(false);
  };

  // DELETE activity
  const handleDeleteActivity = (activityId) => {
    deleteActivity(activityId)
  };

  // Získanie aktivít pre vybraný subjectTerm []
  const getActivities = () => {
    if (selectedSubjectTerm) {
      return activityL.filter(activity => activity.subjTermId === selectedSubjectTerm.id);
    } else {
      return [];
    }
  };
  // STUDENT
  // Študenti priradení k vybranému subjectTerm s ich známkami []
  const enrolledStudents = selectedSubjectTerm ? selectedSubjectTerm.studentList?.map(student => {
    if (student.studentId.startsWith("st")) {
      const user = users.find(user => user.id === student.studentId);
      if (user) {
        return {
          id: user.id,
          name: user.name,
          surname: user.surname,
          grade: student.grade
        };
      } else {
        return null;
      }
    } else {
      return null;
    }
  }).filter(student => student !== null) : [];

  // ENROLL / REMOVE student
  const handleEnroll = () => {
    // Ak je študent prihlásený, odstráňte ho
    if (isEnrolled) {
      const updatedStudentList = selectedSubjectTerm.studentList.filter(student => student.studentId !== user.id);
      updateSubjectTerm({ ...selectedSubjectTerm, studentList: updatedStudentList })
      // setSelectedSubjectTerm(prevTerm => ({
      //   ...prevTerm,
      //   studentList: updatedStudentList
      // }));
    } else {
      // Ak študent nie je prihlásený, pridajte ho
      const newStudent = {
        studentId: user.id,
        scoreList: getActivities().map(act => {
          return {
            activityId: act.id,
            score: 0
          }
        }),
        grade: 0 // Tu pridajte požadovanú predvolenú hodnotu pre nového študenta
      };
      updateSubjectTerm({ ...selectedSubjectTerm, studentList: [...selectedSubjectTerm.studentList, newStudent] })
      // setSelectedSubjectTerm(prevTerm => ({
      //   ...prevTerm,
      //   studentList: [...prevTerm.studentList, newStudent]
      // }));
    }
  };

  // zistenie či je prihlásený užívateľ enrolled k SubjTerm
  const isEnrolled = selectedSubjectTerm && selectedSubjectTerm.studentList?.some(student => student.studentId === user.id);
  
  // SCORE and GRADE

  // pri zmene subjectTerm alebo user vypočíta študentovi percentá, ktoré z predmetu získal
  useEffect(() => {
    if (selectedSubjectTerm && user) {
      const ratio = calculateSuccessRatio(user.id, selectedSubjectTerm);
      setNow(ratio);
    }
  }, [selectedSubjectTerm, user]);

  // výpočet MAXIMÁLNEho DOSIAHNUTEĽNÉho SCORE v rámci subjectTerm
  const calculateMaxScore = (subjTermId) => {
    let maxScore = 0;
    activityL.forEach(activity => {
      if (activity.subjTermId === subjTermId.id) {
        maxScore += activity.maxScore;
      }
    });
    return maxScore;
  };

  // výpočet DOSIAHNUTÉho SCORE za študenta
  const calculateTotalAchievedScore = (studentId, selectedSubjectTerm) => {
    const student = selectedSubjectTerm.studentList?.find(student => student.studentId === studentId);
    if (student && student.scoreList) {
      let totalAchievedScore = 0;
      student.scoreList.forEach(score => { totalAchievedScore += score.score });
      return totalAchievedScore;
    } else {
      return 0;
    }
  };

  // výpočet známky podľa percenta
  const calculateGrade = (studentId, subjTermId) => {
    const ratio = calculateSuccessRatio(studentId, subjTermId);
    let grade = 0;
    if (ratio < 60) grade = 0;
    else if (ratio >= 60 && ratio < 75) grade = 3;
    else if (ratio >= 75 && ratio < 88) grade = 2;
    else if (ratio >= 88) grade = 1;
    return grade;
  };

  // výpočet PERCENTA dosiahnuté score / max možné score
  const calculateSuccessRatio = (studentId, subjTermId) => {
    const maxScore = calculateMaxScore(selectedSubjectTerm);
    const totalAchievedScore = calculateTotalAchievedScore(studentId, subjTermId);
    const successRatio = (totalAchievedScore / maxScore) * 100;
    return Math.round(successRatio);
  };

  const handleBack = () => navigate(`/subject`);

  return (
    <>
      {subjDetail && <>
        <div className="formDetail">
          {user && (

            <Navbar collapseOnSelect expand="sm" bg="light">
              <div className="container-fluid">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse style={{ justifyContent: "flex-end" }}>
                  <div className="formDetailButton">
                    {!user.id.startsWith("st") && (
                      <>
                        <Button variant="primary" size="sm" onClick={() => handleOpen("subjectTerm")}>
                          + SubjectTerm
                        </Button>
                        <Button variant="primary" size="sm" onClick={() => handleOpen("activity")}>
                          + Activity
                        </Button>
                      </>
                    )}
                    {user.id.startsWith("st") && (
                      <Button
                        variant="primary"
                        size="sm"
                        disabled={selectedSubjectTerm === null}
                        onClick={() => handleEnroll()}
                      >
                        {isEnrolled ? "Remove" : "Enroll"}
                      </Button>
                    )}
                    {!user.id.startsWith("st") && (
                      <Button variant="success" size="sm">
                        Update
                      </Button>
                    )}
                    <Button variant="outline-secondary" size="sm" onClick={handleBack}>
                      Back
                    </Button>
                  </div>
                </Navbar.Collapse>
              </div>
            </Navbar>
          )}
          <br />
          <div>
            <b style={{ fontSize: '1.2em' }}>{subjDetail.name}</b>
          </div>
          <br />
          <div>
            <b> Credits: </b>{subjDetail.credits}
          </div>
          <div>
            <b> Supervisor:  </b>{subjDetail.supervisor}
          </div>
          <div>
            <b> Goal:  </b>{subjDetail.goal}
          </div>
          <div>
            <b> Degree:  </b>{subjDetail.degree}
          </div>
          <div>
            <b> Language:  </b>{subjDetail.language}
          </div>
          <div>
            <b> School:  </b>{subjDetail.school}
          </div>
          <div>
            <b> Description:  </b>{subjDetail.description}
          </div>
          <br />
          {user && (
            <>
              <div>
                {/* <b>Subject Terms: </b> */}
                <br />
                <Tabs
                  id="subject-terms-tabs"
                  activeKey={selectedSubjectTerm ? selectedSubjectTerm.id : null}
                  onSelect={(key) => {
                    const term = getSubjectTerms().find(term => term.id === key);
                    if (term) handleSubjectTermClick(term);
                  }}
                >
                  {subjTerms
                    .sort((a, b) => b.semester.localeCompare(a.semester))
                    .map((term) => (
                      <Tab
                        key={term.id}
                        eventKey={term.id}
                        title={term.semester}
                      />
                    ))}
                </Tabs>
              </div>
              <br />

              {/*         Tabuľka s aktivitami pre vyučujúceho */}
              {!selectedSubjectTerm || (user.id.startsWith("st") && selectedSubjectTerm.studentList?.some(student => student.studentId === user.id)) ? null : (
                <Table striped bordered>
                  <thead>
                    <tr>
                      <th> Activity </th>
                      <th> Min Score </th>
                      <th> Max Score </th>
                      <th> Dead Line </th>
                      {!((user.id.startsWith("st")) && (!isEnrolled)) && (
                        <th> Detail </th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {getActivities().map((activity) => (
                      <tr key={activity.id}>
                        <td>{activity.name}</td>
                        <td>{activity.minScore}</td>
                        <td>{activity.maxScore}</td>
                        <td>{moment(activity.deadline).format("DD. MM. YYYY HH:mm")}</td>
                        {!((user.id.startsWith("st")) && (!isEnrolled)) && (
                          <td>
                            <Button
                              variant="outline-primary"
                              size="sm"
                              onClick={() => setSelectedActivity(activity)} // Nastaviť vybranú úlohu
                            >
                              {"<"}
                            </Button>
                            {" "}
                            <Icon
                              path={mdiTrashCanOutline}
                              style={{ cursor: 'pointer', color: 'grey' }}a
                              size={0.8}
                              onClick={() => handleDeleteActivity(activity.id)}
                            />
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
              <br />

              {/*         Tabuľka so zoznamom prihlásených študentov pre vyučujúceho */}
              {!user.id.startsWith("st") && (
                <>
                  <div> <b>Enrolled students: </b></div>
                  <Table striped bordered>
                    <thead>
                      <tr>
                        <th> Name </th>
                        <th> Surname </th>
                        <th> Total score </th>
                        <th> Grade </th>
                        <th> Detail </th>
                      </tr>
                    </thead>
                    <tbody>
                      {enrolledStudents.map((student) => (
                        <tr key={student.id}>
                          <td>{student.name}</td>
                          <td>{student.surname}</td>
                          <td>{calculateTotalAchievedScore(student.id, selectedSubjectTerm)}</td>
                          <td>{calculateGrade(student.id, selectedSubjectTerm)}</td>
                          <td>
                            <Button
                              variant="outline-primary"
                              size="sm"
                              onClick={() => setSelectedStudent(student)}
                            >
                              {"<"}
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </>
              )}
              <br />
              {user.id.startsWith("st") && selectedSubjectTerm && selectedSubjectTerm.studentList?.some(student => student.studentId === user.id) && (
                <>

                  {/*         Tabuľka s aktivitami pre konkrétneho (prihláseného) študenta */}
                  <div> <b>Score of logged in student: </b></div>
                  <Table striped bordered>
                    <thead>
                      <tr>
                        <th> Activity </th>
                        <th> Min Score </th>
                        <th> Max Score </th>
                        <th> Achieved score </th>
                        <th> Dead Line </th>
                      </tr>
                    </thead>
                    <tbody>
                      {getActivities().map((activity) => {
                        // Overíme, či je prihlásený študent na túto aktivitu
                        const isEnrolled = selectedSubjectTerm.studentList?.some(student => student.studentId === user.id && student.scoreList.some(score => score.activityId === activity.id));
                        // Ak je prihlásený, zobrazíme mu detaily aktivity
                        if (isEnrolled) {
                          const studentScore = selectedSubjectTerm.studentList?.find(student => student.studentId === user.id)?.scoreList.find(score => score.activityId === activity.id)?.score;
                          return (
                            <tr key={activity.id}>
                              <td>{activity.name}</td>
                              <td>{activity.minScore}</td>
                              <td>{activity.maxScore}</td>
                              <td>{studentScore || '-'}</td>
                              <td>{moment(activity.deadline).format("DD. MM. YYYY HH:mm")}</td>
                            </tr>
                          );
                        } else {
                          return null; // Skryjeme riadok pre aktivity, do ktorých študent nie je prihlásený
                        }
                      })}

                    </tbody>
                  </Table>
                  <br />
                  <ProgressBar now={now} label={`${now}%`} />
                </>
              )}
            </>
          )}
          {!isLoggedIn && (
            <div>
              <Button variant="outline-secondary" size="sm" onClick={handleBack}>
                Back
              </Button>
            </div>
          )}
          {selectedActivity && (
            <ActivityDetail
              updateSubjectTerm={updateSubjectTerm}
              activity={selectedActivity}
              subjectTerm={selectedSubjectTerm}
              onClose={() => setSelectedActivity(null)}
            />
          )}
          {selectedStudent && (
            <StudentDetail
              selectedStudent={selectedStudent}
              onClose={() => setSelectedStudent(null)}
            />
          )}
        </div>

        {/* MODALS MODULES */}
        <AddActivity
          show={showAA}
          handleClose={handleClose}
          addActivity={handleAddActivity}
        />
        <AddSubjectTerm
          show={showAST}
          handleClose={handleClose}
          addSubjectTerm={handleAddSubjectTerm}
          subjDetail={subjDetail}
          subjTerms={subjTerms}
        />
      </>
      }
    </>

  );
}

export default SubjectDetail;