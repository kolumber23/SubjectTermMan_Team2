import React, { useMemo, useState, useEffect } from "react";
import SubjectList from "../bricks/SubjectList"
import { CallBackendWithCallback } from "../helpers/apiCaller.js"


function SubjectR() {
  const [subject, setSubject] = useState({ state: "appStart" })
  const [subjectTerm, setSubjectTerm] = useState({ state: "appStart" })

  useEffect(() => {
    CallBackendWithCallback("http://localhost:3011/api/subject/listSubjects", (response) => {
      setSubject(
        {
          state: "succes",
          data: response.data
        })
    })
  }, [])


  useEffect(() => {
    CallBackendWithCallback("http://localhost:3011/api/subjectTerm/listActive?semester=summer 23/24", (response) => {
      setSubjectTerm(
        {
          state: "succes",
          data: response.data.map(element => { return {...element, assigmentList: element.activityList.map(act => act.activityId)  }})
        })
    })
  }, [])

  const assigment = useMemo(() => {
    const asignmentArray = [];
    if (subjectTerm?.data) {
      subjectTerm.data.forEach(element => {
        asignmentArray.push(...element.activityList);
      });
    }
    return asignmentArray
  }, [subjectTerm])

  // const subjectL = [
  //   {
  //     "id": "MA-BC",
  //     "name": "Mathematic Analysis",
  //     "credits": 6,
  //     "supervisor": "Adam Smith",
  //     "goal": "Mathematic learning",
  //     "degree": "Bc",
  //     "language": "cz",
  //     "description": "description",
  //     "school": "Unicorn University"
  //   },
  //   {
  //     "id": "PM-BC",
  //     "name": "Project management",
  //     "credits": 9,
  //     "supervisor": "Petr Novák",
  //     "goal": "To learn management",
  //     "degree": "Bc",
  //     "language": "cz",
  //     "description": "description",
  //     "school": "Unicorn University"
  //   },
  //   {
  //     "id": "AJ-MG",
  //     "name": "Bussiness english",
  //     "credits": 3,
  //     "supervisor": "Jozef Mrkva",
  //     "goal": "To learn english language",
  //     "degree": "Mgr",
  //     "language": "en",
  //     "description": "description",
  //     "school": "Unicorn University"
  //   }
  // ];

  return (
    <div>
      {subject?.state === "succes" && subjectTerm?.state === "succes" && <SubjectList
        subjectL={subject.data}
        subjectTermL={subjectTerm.data}
        assigmentL={assigment}
      />
      }
    </div>
  );
};

export default SubjectR;