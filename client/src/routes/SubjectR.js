import React from "react";
import SubjectList from "../bricks/SubjectList"


function SubjectR() {
  const subjectL = [
    {
      "subjectId": "MA-BC",
      "name": "Mathematic Analysis",
      "credits": 6,
      "supervisor": "Adam Smith",
      "goal": "Mathematic learning",
      "degree": "Bc",
      "language": "cz",
      "description": "description",
      "subjectTermList": ["24-S01-MA-BC","24-S02-MA-BC", "23-W01-MA-BC"],
      "school": "Unicorn University"
    },
    {
      "subjectId": "PM-BC",
      "name": "Project management",
      "credits": 9,
      "supervisor": "Petr Novák",
      "goal": "To learn management",
      "degree": "Bc",
      "language": "cz",
      "description": "description",
      "subjectTermList": ["24-S01-PM-BC","24-S02-PM-BC", "23-W01-PM-BC"],
      "school": "Unicorn University"
    },
    {
      "subjectId": "AJ-MG",
      "name": "Bussiness english",
      "credits": 3,
      "supervisor": "Jozef Mrkva",
      "goal": "To learn english language",
      "degree": "Mgr",
      "language": "en",
      "description": "description",
      "subjectTermList": ["24-S01-AJ-MG","24-S02-AJ-MG", "23-W01-AJ-MG"],
      "school": "Unicorn University"
    }
  ];

  const subjectTermL = [
    {
      "subjectTermId": "24-S01-MA-BC",
      "subjectId": "MA-BC",
      "semester": "Summer 2024",
      "studentList": [{"123": [{"1653285": 10}, {"1654653": 2}]},
                    {"456": [{"1653285": 5}, {"1654653": 3}]}],
      "assignmentList": ["1653285", "1654653"]
    }
  ];

  const assigmentL = [

  {
    "assignmentId": "1653285", 
    "name": "Course", 
    "subjectTermId": "24-S01-MA-BC", // subjectTerm identifier
    "description": "Elementary function - uuCourse", // assignment description, string; length is limited to 1-1000 characters
    "maxScore": 10, // maxScore amount, number; range from 1 to 100
    "minScore": 2, // minScore amount, number; range from 0 to 100
    "deadline": "2024-03-31T23:59:59", // string, ISO 8601 datetime format - YYYY-MM-DDThh:mm:ss
    "studentList": ["123", "456"], // list of studentIds
  },
  {
    "assignmentId": "1654653", 
    "name": "Test", 
    "subjectTermId": "24-S01-MA-BC", 
    "description": "Test from issues 1-6", 
    "maxScore": 50, 
    "minScore": 30, 
    "deadline": "2024-04-30T23:59:59", 
    "studentList": ["123", "456"], 
  }
];

  return (
    <div>
      <SubjectList 
        subjectL={subjectL}
        subjectTermL={subjectTermL}
        assigmentL={assigmentL}
      />
    </div>
    );
};

export default SubjectR;