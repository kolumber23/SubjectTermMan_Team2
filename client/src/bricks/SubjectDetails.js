// SubjectDetails.js
import React from "react";

function SubjectDetails({ match }) {
  const { subjectId } = match.params;

  // Fetch subject details using subjectId from API or database

  return (
    <div>
      <h2>Subject Details</h2>
      <p>Subject ID: {subjectId}</p>
      {/* Display other subject details */}
    </div>
  );
}

export default SubjectDetails;
