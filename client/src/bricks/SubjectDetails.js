import React, { useState, useEffect } from "react";

function SubjectDetails({ subjectId }) {
  const [subjectDetails, setSubjectDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state

  useEffect(() => {
    const fetchSubjectDetails = async () => {
      try {
        const response = await fetch(`/api/subjects/${subjectId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch subject details");
        }
        const data = await response.json();
        setSubjectDetails(data);
        setIsLoading(false); // Set isLoading to false after data is fetched
      } catch (error) {
        console.error("Error fetching subject details:", error.message);
        setIsLoading(false); // Set isLoading to false if there's an error
      }
    };

    fetchSubjectDetails();
  }, [subjectId]);

  if (isLoading) {
    return <div>Loading...</div>; // Show "Loading..." message while fetching data
  }

  return (
    <div>
      <h2>{subjectDetails.name}</h2>
      <p>Credits: {subjectDetails.credits}</p>
      <p>Supervisor: {subjectDetails.supervisor}</p>
      <p>Goal: {subjectDetails.goal}</p>
      
      {subjectDetails.grades && subjectDetails.grades.length > 0 && (
        <ul>
          {subjectDetails.grades.map((grade, index) => (
            <li key={index}>
              {grade.student}: {grade.grade}
            </li>
          ))}
        </ul>
      )}
      {/* Add more sections to display assignments, scores, etc. */}
    </div>
  );
}

export default SubjectDetails;
