import React, { useState } from "react";
import Login from "../components/Login";  // Import the Login component

function HomeR() {

  const [showLoginModal, setShowLoginModal] = useState(false);
// eslint-disable-next-line
const handleLoginButtonClick = () => {
    setShowLoginModal(true); // Show the login modal when the button is clicked
  };

  return (
    <div>
      <h2>Welcome to uuSubjectTermMan</h2>
      <p>This is the home page of Unicorn Universityn. Here, you can manage subjects and students.</p>
      <p>uuSubjectTermMan is a comprehensive platform designed to help you efficiently manage subjects and students in a school environment. </p>
    <p>It provides features for adding assignments, grades, and scores, as well as managing subject details and student information.</p>
    </div>
  );
};

export default HomeR;
