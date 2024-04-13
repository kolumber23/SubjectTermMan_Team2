import React, { useState, useEffect } from "react";

function SubjectDetails({ subjectId }) {
  const [subjectDetails, setSubjectDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true); // Добавляем состояние isLoading

  useEffect(() => {
    const fetchSubjectDetails = async () => {
      try {
        const response = await fetch(`/api/subjects/${subjectId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch subject details");
        }
        const data = await response.json();
        setSubjectDetails(data);
        setIsLoading(false); // Устанавливаем isLoading в false после получения данных
      } catch (error) {
        console.error("Error fetching subject details:", error.message);
        setIsLoading(false); // Устанавливаем isLoading в false в случае ошибки
      }
    };

    fetchSubjectDetails();
  }, [subjectId]);

  if (isLoading) {
    return <div>Loading...</div>; // Отображаем сообщение "Loading..." во время загрузки данных
  }

  return (
    <div>
      <h2>{subjectDetails.name}</h2>
      <p>Credits: {subjectDetails.credits}</p>
      <p>Supervisor: {subjectDetails.supervisor}</p>
      <p>Goal: {subjectDetails.goal}</p>

      {subjectDetails.students && subjectDetails.students.length > 0 && (
        <div>
          <h3>Students:</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Surname</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {subjectDetails.students.map((student, index) => (
                <tr key={index}>
                  <td>{student.name}</td>
                  <td>{student.surname}</td>
                  <td>{student.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {subjectDetails.assignments && subjectDetails.assignments.length > 0 && (
        <div>
          <h3>Assignments:</h3>
          <table>
            <thead>
              <tr>
                <th>Assignment</th>
                <th>Deadline</th>
              </tr>
            </thead>
            <tbody>
              {subjectDetails.assignments.map((assignment, index) => (
                <tr key={index}>
                  <td>{assignment.name}</td>
                  <td>{assignment.deadline}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {subjectDetails.scores && subjectDetails.scores.length > 0 && (
        <div>
          <h3>Scores:</h3>
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {subjectDetails.scores.map((score, index) => (
                <tr key={index}>
                  <td>{score.student}</td>
                  <td>{score.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default SubjectDetails;
