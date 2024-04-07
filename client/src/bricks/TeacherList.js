// TeacherList.js
import React from 'react';

function TeacherList({ loggedInUser }) {
  return (
    <div>
      <h2>Welcome, {loggedInUser.name}</h2>
      <h3>Students:</h3>
      <ul>
        {loggedInUser.students.map((student, index) => (
          <li key={index}>{student}</li>
        ))}
      </ul>
    </div>
  );
}

export default TeacherList;
