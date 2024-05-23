import React, { createContext, useState, useEffect, useContext } from 'react';
import { CallBackendAsync } from "./helpers/apiCaller.js"
import UserContext from "./AuthProvider";

const SubjContext = createContext();

function updateArrayItem(array, newItemData) {
  const indexedArray = array.map((item, id) => { return { ...item, index: id } })
  const index = indexedArray.find(item => item.id == newItemData.id).index;
  const modifiedArray = [...array];
  modifiedArray[index] = newItemData;
  return modifiedArray
}

export function SubjProvider({ children }) {
  const { user } = useContext(UserContext);
  const [subjectL, setSubjectL] = useState([]);
  const [subjectTermL, setSubjectTermL] = useState([]);
  const [activityL, setActivityL] = useState([]);

  const createActivity = async (activityData) => {
    const reqBody = { ...activityData }
    const responseActivity = await CallBackendAsync("http://localhost:3011/api/activity/create", user.token, "post", reqBody)
    setActivityL([ ...activityL, responseActivity.data]);
  }
  const deleteActivity = async (activityId) => {
    const reqBody = { activityId: activityId }
    const responseActivity = await CallBackendAsync("http://localhost:3011/api/activity/delete", user.token, "post", reqBody)
    if (!responseActivity.error) { //
      setActivityL(activityL.filter(item => item.id !== activityId));
    }
    else
    {
      console.error(responseActivity.error);
    }
  }
  const createSubjectTerm = async (subjectTermData) => {
    const reqBody = { subjectId: subjectTermData.subjectId, semester: subjectTermData.semester }
    const responseSubjectTerm = await CallBackendAsync("http://localhost:3011/api/subjectTerm/create", user.token, "post", reqBody)

    setSubjectTermL([ ...subjectTermL, responseSubjectTerm.data]);

  }
  const updateSubjectTerm = async (subjectTerm) => {
    const reqBody = { subjectTermId: subjectTerm.id, semester: subjectTerm.semester, studentList: subjectTerm.studentList }
    const responseSubjectTerm = await CallBackendAsync("http://localhost:3011/api/subjectTerm/update", user.token, "put", reqBody)

    setSubjectTermL(updateArrayItem(subjectTermL, responseSubjectTerm.data));
  };

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
      value={{
        subjectL,
        subjectTermL,
        activityL,
        updateSubjectTerm,
        createSubjectTerm,
        createActivity,
        deleteActivity
      }}
    >
      {children}
    </SubjContext.Provider>
  );
};

export default SubjContext;