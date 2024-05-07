import React, { createContext, useState, useEffect } from 'react';

const SubjContext = createContext();

export function SubjProvider({ children })  {
  const [subjectL, setSubjectL] = useState([]);
  const [subjectTermL, setSubjectTermL] = useState([]);
  const [activityL, setActivityL] = useState([]);

 
 
  const fetchData = async () => {
    try {
      const responseActivities = await fetch('/storage/activities.json');
      const dataActivities = await responseActivities.json();
      setActivityL(dataActivities);

      const responseSubjects = await fetch('/storage/subjects.json');
      const dataSubjects = await responseSubjects.json();
      setSubjectL(dataSubjects);

      const responseSubjectTerms = await fetch('/storage/subjectTerms.json');
      const dataSubjectTerms = await responseSubjectTerms.json();
      setSubjectTermL(dataSubjectTerms);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  fetchData();

return (
  <SubjContext.Provider 
    value = {{ 
      subjectL,
      subjectTermL,
      activityL
    }}
      >
        {children}
    </SubjContext.Provider>
  );
};

export default SubjContext;