import React, { useState, useEffect, useContext } from "react";
import { Button, Navbar, Table, Tab, Tabs } from 'react-bootstrap';
import { useNavigate } from "react-router-dom"
import UserContext from "../Provider";

import ActivityDetail from "./ActivityDetail";

function SubjectDetail({ subjDetail, subjectTermL, activityL }) {
  const navigate = useNavigate();
  const { users } = useContext(UserContext);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [selectedSubjectTerm, setSelectedSubjectTerm] = useState(null);

  // Funkcia na získanie priradení pre daný predmet a vybraný subjekt
  const getActivities = () => {
    if (selectedSubjectTerm) {
      return activityL.filter(activity => activity.subjTermId === selectedSubjectTerm.id);
    } else {
      return [];
    }
  };

 // Pole so študentami priradenými k vybranému subjectTerm s ich známkami
  const enrolledUsers = selectedSubjectTerm ? selectedSubjectTerm.subjectTermStudentList.map(student => {
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
  }).filter(student => student !== null) : [];
  

  const handleSubjectTermClick = (term) => {
    setSelectedSubjectTerm(term);
    setSelectedActivity(null); // Zrušíme výber aktivity pri zmene subjektu
  };

  const handleBack = () => navigate(`/subject`);

  useEffect(() => {
    
    if (subjectTermL.length > 0) {
      const latestTerm = subjectTermL[0]; // Predpokladáme, že prvý termín v zozname je najnovší
      setSelectedSubjectTerm(latestTerm);
    }
  }, [subjDetail]);

return (
<>
  <div className="formDetail">
    <Navbar collapseOnSelect expand="sm" bg="light">
      <div className="container-fluid">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse style={{ justifyContent: "flex-end" }}>
        <div className="formDetailButton">
          <Button variant="primary" size="sm">
            + SubjectTerm
          </Button>
          <Button variant="primary" size="sm">
            + Activity
          </Button>
          <Button variant="primary" size="sm">
            Enroll/Remove
          </Button>
          <Button variant="success" size="sm">
            Update
          </Button>
          <Button variant="outline-secondary"  size="sm" onClick={handleBack}>
            Back
          </Button>
        </div>  
        </Navbar.Collapse> 
      </div>
    </Navbar>
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
  <div>
    <b>Subject Terms: </b>
  <br />
    <Tabs
      id="subject-terms-tabs"
      activeKey={selectedSubjectTerm ? selectedSubjectTerm.id : null}
      onSelect={(key) => {
      const term = subjectTermL.find(term => term.id === key);
        if (term) handleSubjectTermClick(term);
      }}
    >
    {subjectTermL.map((term) => (
      <Tab
        key={term.id}
        eventKey={term.id}
        title={term.semester}
      />
    ))}
      </Tabs>
    </div>
 {/* Verzia s buttons
  {/* <div>
  <div style={{ display: 'flex' }}>
    {subjectTerms.map((term) => (
      <Button 
        key={term.subjectTermId}
        variant={term === selectedSubjectTerm ? "outline-primary" : "secondary-outline"}
        onClick={() => handleSubjectTermClick(term)}
        style={{ marginRight: '5px' }}
      >
        {term.semester}
      </Button>
    ))}
  </div>
  </div> */}
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
      {getActivities().map((activity) => (
        <tr key={activity.id}>
          <td>{activity.name}</td>
          <td>{activity.minScore}</td>
          <td>{activity.maxScore}</td>
          <td>
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => setSelectedActivity(activity)} // Nastaviť vybranú úlohu
            >
              {"<"} 
            </Button>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
<br />
<br />
<div> <b>Enrolled students: </b></div>
<Table striped bordered>
    <thead>
      <tr>
        <th> Name </th>
        <th> Surname </th>
        <th> Grade </th>
        <th> Detail </th>
      </tr>
    </thead>
    <tbody>
      {enrolledUsers.map((student) => (
        <tr key={student.id}>
          <td>{student.name}</td>
          <td>{student.surname}</td>
          <td>{student.grade}</td>
          <td>
            <Button
              variant="outline-primary"
              size="sm"
            >
              {"<"} 
            </Button>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>

  {selectedActivity && (
    <ActivityDetail
      activity={selectedActivity}
      subjectTerm={selectedSubjectTerm}
      onClose={() => setSelectedActivity(null)}
    />
  )}
</div>
    </>   
  );
}

export default SubjectDetail;