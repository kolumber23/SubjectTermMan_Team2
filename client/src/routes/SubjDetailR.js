import React, { useContext } from "react";
import SubjectDetail from "../bricks/SubjectDetail"
import SubjContext from "../SubjProvider";
import { useParams } from "react-router-dom";


function SubjectR() {
  const { subjectL, subjectTermL, activityL } = useContext(SubjContext);
  const { id } = useParams();
  const selectedSubject = subjectL.find(subject => subject.id === id);

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