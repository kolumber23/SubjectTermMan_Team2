import React, { useState } from "react";
import StudentList from "../bricks/StudentList";

function StudentR() {
  const [studentL, setStudentL] = useState([
    {
      "studentId": "123",
      "name": "Adam",
      "surname": "Smith",
      "degree": "Bc",
      "subjectTermList": ["24-S01-MA-BC","24-S02-MA-BC", "23-W01-MA-BC"],
      "grades": [],
      "scores": [],
      "assignments": []
    },
    // Add more students here
    {
      "studentId": "456",
      "name": "Emily",
      "surname": "Jones",
      "degree": "Bs",
      "subjectTermList": ["24-S01-MA-BS","24-S02-MA-BS", "23-W01-MA-BS"],
      "grades": [],
      "scores": [],
      "assignments": []
    },
    {
      "studentId": "789",
      "name": "Michael",
      "surname": "Johnson",
      "degree": "Ba",
      "subjectTermList": ["24-S01-MA-BA","24-S02-MA-BA", "23-W01-MA-BA"],
      "grades": [],
      "scores": [],
      "assignments": []
    }
  ]);




  // Function to add a new student
  const addStudent = (newStudent) => {
    setStudentL([...studentL, newStudent]);
  };

  // Function to add grade for a student
  const addGrade = (studentId, grade) => {
    const updatedStudentL = studentL.map(student => {
      if (student.studentId === studentId) {
        return {
          ...student,
          grades: [...student.grades, grade]
        };
      }
      return student;
    });
    setStudentL(updatedStudentL);
  };

  // Function to add score for a student
  const addScore = (studentId, score) => {
    const updatedStudentL = studentL.map(student => {
      if (student.studentId === studentId) {
        return {
          ...student,
          scores: [...student.scores, score]
        };
      }
      return student;
    });
    setStudentL(updatedStudentL);
  };

  // Function to add assignment for a student
  const addAssignment = (studentId, assignment) => {
    const updatedStudentL = studentL.map(student => {
      if (student.studentId === studentId) {
        return {
          ...student,
          assignments: [...student.assignments, assignment]
        };
      }
      return student;
    });
    setStudentL(updatedStudentL);
  };

  return (
    <div>
      <h2>Student List</h2>
      {/* Pass studentL, setStudentL, and the add functions to StudentList component */}
      <StudentList 
        studentL={studentL} 
        setStudentL={setStudentL} 
        addStudent={addStudent} 
        addGrade={addGrade} 
        addScore={addScore} 
        addAssignment={addAssignment} 
      />
    </div>
  );
}

export default StudentR;
