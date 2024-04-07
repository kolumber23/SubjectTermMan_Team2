// SubjectR.js
import React from "react";
import SubjectList from "../bricks/SubjectList";

function SubjectR() {
  const subjectL = [
    {
      "subjectId": "MA-BC",
      "name": "Mathematic Analysis",
      "credits": 9,
      "supervisor": "Name Surname",
      "goal": "goal",
      "degree": "Bc",
      "language": "cz",
      "description": "description",
      "subjectTermList": ["24-S01-MA-BC","24-S02-MA-BC", "23-W01-MA-BC"],
      "school": "Unicorn University"
    }
  ];

  return (
    <div>
      <h2>Subject List</h2>
      <SubjectList subjectL={subjectL}/>
    </div>
  );
};

export default SubjectR;