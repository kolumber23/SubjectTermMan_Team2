import React, { createContext, useState, useEffect } from 'react';
import { CallBackendAsync } from "./helpers/apiCaller.js"

const SubjContext = createContext();

export function SubjProvider({ children })  {
  const [subjectL, setSubjectL] = useState([]);
  const [subjectTermL, setSubjectTermL] = useState([]);
  const [activityL, setActivityL] = useState([]);

 
 
  const fetchData = async () => {
    try {
      const responseActivities = await CallBackendAsync("http://localhost:3011/api/activity/list")
      setActivityL(responseActivities.data);

      const responseSubjects = await CallBackendAsync("http://localhost:3011/api/subject/listSubjects")
      setSubjectL(responseSubjects.data);

      const responseSubjectTerms = await CallBackendAsync("http://localhost:3011/api/subjectTerm/list")
      setSubjectTermL(responseSubjectTerms.data);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [])

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