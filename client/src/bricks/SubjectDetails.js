// SubjectDetails.js
import React from 'react';

function SubjectDetails({ loggedInUser }) {
  const handleAddAssignment = () => {
    // Logic to add assignment
  };

  const handleAddScore = () => {
    // Logic to add score
  };

  const handleAddGrade = () => {
    // Logic to add grade
  };

  const handleEnroll = () => {
    // Logic to enroll in assignment
  };

  return (
    <div>
      <h2>Subject Details</h2>
      {loggedInUser.role === 'teacher' ? (
        <div>
          <button onClick={handleAddAssignment}>Add Assignment</button>
          <button onClick={handleAddScore}>Add Score</button>
          <button onClick={handleAddGrade}>Add Grade</button>
        </div>
      ) : (
        <button onClick={handleEnroll}>Enroll</button>
      )}
    </div>
  );
}

export default SubjectDetails;
