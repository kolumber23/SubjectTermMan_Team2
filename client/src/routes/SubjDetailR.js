import React from "react";
import { useLocation } from "react-router-dom";
import SubjectDetail from "../bricks/SubjectDetail"


function SubjectR() {
    const location = useLocation();
    const { selectedSubject, subjectTermL, activityL } = location.state;

  return (
    <div>
      <SubjectDetail 
        subjDetail={selectedSubject}
        subjectTermL={subjectTermL}
        activityL={activityL}
      />
    </div>
    );
};

export default SubjectR;