import React, { useState } from "react";
import SubjectList from "../bricks/SubjectList";
import SubjectDetailsModal from "../bricks/SubjectDetailsModal";

function SubjectR() {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null); // Initialize loggedInUser state

  const onViewDetails = (subjectId) => {
    console.log("Viewing details for subject ID:", subjectId);
    setSelectedSubject(subjectId);
    setShowModal(true);
  };

  // Function to log in as teacher
  const loginAsTeacher = () => {
    setLoggedInUser({ role: "teacher" });
  };

  // Function to log in as student
  const loginAsStudent = () => {
    setLoggedInUser({ role: "student" });
  };

  // Sample list of subjects with details
  const subjectList = [
    {
      subjectId: "MA-BC",
      name: "Mathematic Analysis",
      credits: 9,
      supervisor: "Name Surname",
      goal: "goal",
      degree: "Bc",
      language: "cz",
      description: "description",
      subjectTermList: ["24-S01-MA-BC", "24-S02-MA-BC", "23-W01-MA-BC"],
      school: "Unicorn University"
    },
    // Add more subjects here
    {
      subjectId: "PHYS-SC",
      name: "Physics",
      credits: 6,
      supervisor: "John Doe",
      goal: "Understand the principles of physics",
      degree: "Bs",
      language: "en",
      description: "A comprehensive course covering various aspects of physics.",
      subjectTermList: ["24-S01-PHYS-SC", "24-S02-PHYS-SC", "23-W01-PHYS-SC"],
      school: "Unicorn University"
    }
  ];

  return (
    <div>
      <h2>Subject List</h2>
      <SubjectList subjectL={subjectList} onViewDetails={onViewDetails} />
      <SubjectDetailsModal
        show={showModal}
        onHide={() => setShowModal(false)}
        subjectDetails={
          selectedSubject
            ? subjectList.find((subject) => subject.subjectId === selectedSubject)
            : null
        }
        loggedInUser={loggedInUser} // Pass loggedInUser prop to SubjectDetailsModal
      />
      {/* Login buttons */}
      {loggedInUser === null && (
        <>
          <button onClick={loginAsTeacher}>Login as Teacher</button>
          <button onClick={loginAsStudent}>Login as Student</button>
        </>
      )}
      {/* Logout button */}
      {loggedInUser !== null && (
        <button onClick={() => setLoggedInUser(null)}>Logout</button>
      )}
    </div>
  );
}

export default SubjectR;
