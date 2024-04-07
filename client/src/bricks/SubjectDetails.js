// SubjectDetails.js

import React, { useState, useEffect } from "react";

function SubjectDetails({ subjectId, loggedInUser }) {
  const [subjectDetails, setSubjectDetails] = useState(null);

  useEffect(() => {
    fetchSubjectDetails(subjectId);
  }, [subjectId]);

  const fetchSubjectDetails = async (subjectId) => {
    // Fetch subject details based on subjectId
    // For demonstration purposes, setting dummy data
    setSubjectDetails({
      name: "Mathematic Analysis",
      credits: 9,
      supervisor: "Name Surname",
      goal: "goal",
      grades: [
        { student: "Student 1", grade: "A" },
        { student: "Student 2", grade: "B" },
        // Add more grades as needed
      ],
      // Add more details such as assignments, scores, etc.
    });
  };

  if (!subjectDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{subjectDetails.name}</h2>
      <p>Credits: {subjectDetails.credits}</p>
      <p>Supervisor: {subjectDetails.supervisor}</p>
      <p>Goal: {subjectDetails.goal}</p>
      {/* Display grades */}
      <h3>Grades</h3>
      <ul>
        {subjectDetails.grades.map((grade, index) => (
          <li key={index}>
            {grade.student}: {grade.grade}
          </li>
        ))}
      </ul>
      {/* Add more sections to display assignments, scores, etc. */}
    </div>
  );
}

export default SubjectDetails;
