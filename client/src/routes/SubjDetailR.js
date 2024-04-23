import React, { useMemo, useState, useEffect } from "react";
import { useParams } from 'react-router';
import SubjectDetail from "../bricks/SubjectDetail"
import { CallBackendWithCallback } from "../helpers/apiCaller.js"


function SubjectR() {
  const { id } = useParams();

  const [subject, setSubject] = useState({ state: "appStart" })
  const [subjectTerm, setSubjectTerm] = useState({ state: "appStart" })

  useEffect(() => {
    CallBackendWithCallback("http://localhost:3011/api/subject/get?subjectId=" + id, (response) => {
      setSubject(
        {
          state: "succes",
          data: response.data
        })
    })
    CallBackendWithCallback("http://localhost:3011/api/subjectTerm/listArchived?subjectId=" + id, (response) => {
      setSubjectTerm(
        {
          state: "succes",
          data: response.data.map(element => { return {...element /*, assigmentList: element.activityList.map(act => act.activityId) */ }})
        })
    })
  }, [])

  // const assigment = useMemo(() => {
  //   const asignmentArray = [];
  //   if (subjectTerm?.data) {
  //     subjectTerm.data.forEach(element => {
  //       asignmentArray.push(...element.activityList);
  //     });
  //   }
  //   return asignmentArray
  // }, [subjectTerm])


  // const subjectTermL = [
  //   {
  //     "id": "24-S01-MA-BC",
  //     "subjectId": "MA-BC",
  //     "semester": "Summer 2024",
  //     "studentList": [
  //       {
  //         "studentId": "st123",
  //         "scoreList": [
  //           {
  //             "activityId": "1653285",
  //             "score": 10
  //           },
  //           {
  //             "activityId": "9875368",
  //             "score": 20
  //           },
  //           {
  //             "activityId": "1845699",
  //             "score": 22
  //           }
  //         ],
  //         "grade": 1
  //       },
  //       {
  //         "studentId": "st456",
  //         "scoreList": [
  //           {
  //             "activityId": "1653285",
  //             "score": 7
  //           },
  //           {
  //             "activityId": "9875368",
  //             "score": 18
  //           },
  //           {
  //             "activityId": "1845699",
  //             "score": 25
  //           }
  //         ],
  //         "grade": 2
  //       },
  //       {
  //         "studentId": "st789",
  //         "scoreList": [
  //           {
  //             "activityId": "1653285",
  //             "score": 8
  //           },
  //           {
  //             "activityId": "9875368",
  //             "score": 23
  //           },
  //           {
  //             "activityId": "1845699",
  //             "score": 24
  //           }
  //         ],
  //         "grade": 3
  //       }
  //     ],
  //   },
  //   {
  //     "id": "23-W01-MA-BC",
  //     "subjectId": "MA-BC",
  //     "semester": "Winter 2023",
  //     "studentList": [
  //       {
  //         "studentId": "st123",
  //         "scoreList": [
  //           {
  //             "activityId": "1653285",
  //             "score": 5
  //           },
  //           {
  //             "activityId": "9875368",
  //             "score": 5
  //           },
  //           {
  //             "activityId": "1845699",
  //             "score": 5
  //           },
  //           {
  //             "activityId": "7488150",
  //             "score": 5
  //           }
  //         ],
  //         "grade": 0
  //       },
  //       {
  //         "studentId": "st456",
  //         "scoreList": [
  //           {
  //             "activityId": "1653285",
  //             "score": 10
  //           },
  //           {
  //             "activityId": "9875368",
  //             "score": 15
  //           },
  //           {
  //             "activityId": "1845699",
  //             "score": 7
  //           },
  //           {
  //             "activityId": "7488150",
  //             "score": 0
  //           }
  //         ],
  //         "grade": 0
  //       },
  //       {
  //         "studentId": "st789",
  //         "scoreList": [
  //           {
  //             "activityId": "1653285",
  //             "score": 4
  //           },
  //           {
  //             "activityId": "9875368",
  //             "score": 3
  //           },
  //           {
  //             "activityId": "1845699",
  //             "score": 3
  //           },
  //           {
  //             "activityId": "7488150",
  //             "score": 10
  //           }
  //         ],
  //         "grade": 0
  //       }
  //     ],
  //   },
  //   {
  //     "id": "24-S01-AJ-MG",
  //     "subjectId": "AJ-MG",
  //     "semester": "Summer 2024",
  //     "studentList": [
  //       {
  //         "studentId": "st987",
  //         "scoreList": [
  //           {
  //             "activityId": "2874936",
  //             "score": 40
  //           },
  //           {
  //             "activityId": "9856355",
  //             "score": 60
  //           }
  //         ],
  //         "grade": 1
  //       },
  //       {
  //         "studentId": "st654",
  //         "scoreList": [
  //           {
  //             "activityId": "2874936",
  //             "score": 45
  //           },
  //           {
  //             "activityId": "9856355",
  //             "score": 25
  //           }
  //         ],
  //         "grade": 3
  //       },
  //       {
  //         "studentId": "st321",
  //         "scoreList": [
  //           {
  //             "activityId": "2874936",
  //             "score": 30
  //           },
  //           {
  //             "activityId": "9856355",
  //             "score": 15
  //           }
  //         ],
  //         "grade": 0
  //       }
  //     ],
  //   }
  // ];

  const activityL = [

  {
    "id": "1653285", 
    "name": "Course", 
    "subjTermId": "24-S01-MA-BC", // subjectTerm identifier
    "description": "Elementary function - uuCourse", // assignment description, string; length is limited to 1-1000 characters
    "maxScore": 10, // maxScore amount, number; range from 1 to 100
    "minScore": 4, // minScore amount, number; range from 0 to 100
    "deadline": "2024-03-31T23:59:59", // string, ISO 8601 datetime format - YYYY-MM-DDThh:mm:ss
  },
  {
    "id": "9875368", 
    "name": "Test1", 
    "subjTermId": "24-S01-MA-BC", 
    "description": "Test from issues 1-2", 
    "maxScore": 25, 
    "minScore": 15, 
    "deadline": "2024-04-150T23:59:59", 
  },
  {
    "id": "1845699", 
    "name": "Test2", 
    "subjTermId": "24-S01-MA-BC", 
    "description": "Test from issues 3-4", 
    "maxScore": 25, 
    "minScore": 15, 
    "deadline": "2024-04-30T23:59:59", 
  },
  {
    "id": "7488150", 
    "name": "Test3", 
    "subjTermId": "24-S01-MA-BC", 
    "description": "Test from issues 5-6", 
    "maxScore": 40, 
    "minScore": 25, 
    "deadline": "2024-05-15T23:59:59", 
  },
  {
    "id": "2874936", 
    "name": "Homework", 
    "subjTermId": "24-S01-AJ-MG", 
    "description": "Essay", 
    "maxScore": 40, 
    "minScore": 25, 
    "deadline": "2024-05-15T23:59:59", 
  },
  {
    "id": "9856355", 
    "name": "Test", 
    "subjTermId": "24-S01-AJ-MG", 
    "description": "Test from issues 1-6", 
    "maxScore": 60, 
    "minScore": 40, 
    "deadline": "2024-05-30T23:59:59", 
  }
];

  return (
    <div>
      {subject?.state === "succes" && subjectTerm?.state === "succes" && <SubjectDetail 
        subjDetail={subject.data}
        subjectTermL={subjectTerm.data}
        activityL={activityL}
      />}
    </div>
    );
};

export default SubjectR;