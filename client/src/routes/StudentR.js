import React from "react";
import StudentList from "../bricks/StudentList";


function StudentR() {
  const studentL = [
   {
      "studentId": "123",
      "name": "Adam",
      "surname": "Smith",
      "degree": "Bc",
      "subjectTermList": ["24-S01-MA-BC","24-S02-MA-BC", "23-W01-MA-BC"]
   },
   {
      "studentId": "456",
      "name": "Petra",
      "surname": "Nová",
      "degree": "Bc",
      "subjectTermList": ["24-S01-MA-BC","24-S02-MA-BC", "23-W01-MA-BC"]
   },
   {
      "studentId": "789",
      "name": "Jace",
      "surname": "Wayland",
      "degree": "Mgr",
      "subjectTermList": ["24-S01-MA-BC","24-S02-MA-BC", "23-W01-MA-BC"]
   }
  ];

    return (
        <div>
          <StudentList studentL={studentL}/>
       </div>
    );
};

export default StudentR;