import React from "react";
import StudentList from "../bricks/StudentList";
import SubjectList from "../bricks/SubjectList";

const studentData = [
    {
      id: 1,
      name: "John Doe",
      age: 20,
      grade: "A",
      courses: ["Math", "Science", "History"]
    },
    {
      id: 2,
      name: "Jane Smith",
      age: 21,
      grade: "B+",
      courses: ["English", "Biology", "Geography"]
    },
    // Add more student objects as needed
  ];
  

  const initialSubjectData = [
    {
      subjectId: "MA-BC",
      name: "Mathematic Analysis",
      credits: 9,
      supervisor: "Name Surname",
      goal: "Learn advanced math concepts",
      degree: "Bc",
      language: "cz",
      description: "This course covers topics in mathematical analysis.",
      subjectTermList: ["24-S01-MA-BC","24-S02-MA-BC", "23-W01-MA-BC"],
      school: "Unicorn University"
    }
  ];
  
  const additionalSubjectData = [
    {
      subjectId: "CS-101",
      name: "Introduction to Computer Science",
      credits: 6,
      supervisor: "John Doe",
      goal: "Learn basic concepts of computer science",
      degree: "Bc",
      language: "en",
      description: "This course provides an introduction to computer science.",
      subjectTermList: ["24-S01-CS-101", "24-S02-CS-101", "23-W01-CS-101"],
      school: "Unicorn University"
    },
    {
      subjectId: "ENG-201",
      name: "Advanced English",
      credits: 6,
      supervisor: "Jane Smith",
      goal: "Enhance English language proficiency",
      degree: "Bc",
      language: "en",
      description: "This course focuses on advanced English language skills.",
      subjectTermList: ["24-S01-ENG-201", "24-S02-ENG-201", "23-W01-ENG-201"],
      school: "Unicorn University"
    }
  ];
  

const subjectData = [...initialSubjectData, ...additionalSubjectData];

function HomePage() {
  return (
    <div>
      <h2>Students</h2>
      <StudentList studentL={studentData} />

      <h2>Subjects</h2>
      <SubjectList subjectL={subjectData} />
    </div>
  );
}

export default HomePage;
