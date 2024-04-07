import React, { useState } from "react";
import Login from "../components/Login";  // Import the Login component

function HomeR() {
  const [showLoginModal, setShowLoginModal] = useState(false); // State to control the visibility of the login modal

  const handleLoginButtonClick = () => {
    setShowLoginModal(true); // Show the login modal when the button is clicked
  };

  return (
    <div>
      <h2>Welcome to uuSubjectTermMan</h2>
      <p>This is the home page of uuSubjectTermMan. Here, you can manage subjects and students.</p>
      
      {/* Render a single login button */}
      <button onClick={handleLoginButtonClick}>Login</button>

      {/* Render login modal */}
      <Login show={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </div>
  );
};

export default HomeR;
