import React, { useContext } from "react";
import SubjectList from "../bricks/SubjectList"
import SubjContext from "../SubjProvider";


function SubjectR() {
  const {subjectL, subjectTermL, activityL, createSubject } = useContext(SubjContext);

  return (
    <div>
      <SubjectList 
        subjectL={subjectL}
        subjectTermL={subjectTermL}
        activityL={activityL}
        createSubject={createSubject}
      />
    </div>
    );
};

export default SubjectR;