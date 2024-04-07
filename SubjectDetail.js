// SubjectDetail.js

import React from "react";
import { Outlet } from "react-router-dom";

function SubjectDetail() {
  return (
    <div>
      <h2>Subject Detail Page</h2>
      {/* Additional details about the subject can be displayed here */}
      <p>This is where you can view detailed information about the subject.</p>
      
      {/* Render child routes */}
      <Outlet />
    </div>
  );
}

export default SubjectDetail;
