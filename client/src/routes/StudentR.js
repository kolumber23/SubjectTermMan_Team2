import React, { useContext } from "react";
import UserContext from "../Provider";

import StudentList from "../bricks/StudentList";

function StudentR() {
   const {users} = useContext(UserContext);
   const studentL = users.filter(user => user.id.startsWith("st"));

return (
   <div>
     <StudentList studentL={studentL} />
   </div>
  );
};

export default StudentR;