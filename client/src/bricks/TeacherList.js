// TeacherList.js
import React from 'react';

function TeacherList({ loggedInUser }) {
  // Assuming you have teachers and students data available
  const teachers = [
    { id: 1, name: 'Teacher 1', students: ['Student 1', 'Student 2'] },
    { id: 2, name: 'Teacher 2', students: ['Student 3', 'Student 4'] },
    // Add more teachers as needed
  ];

  // Find the teacher associated with the logged in user
  const loggedInTeacher = teachers.find((teacher) => teacher.name === loggedInUser.username);

  return (
    <div>
      <h2>Welcome, {loggedInTeacher.name}</h2>
      <h3>Students:</h3>
      <ul>
        {loggedInTeacher.students.map((student, index) => (
          <li key={index}>{student}</li>
        ))}
      </ul>
    </div>
  );
}

export default TeacherList;
