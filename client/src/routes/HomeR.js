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
      {/* Add description of Unicorn University */}
      <p>Unicorn University is a prestigious institution known for its innovative approach to education and commitment to excellence. Located in a picturesque setting, our university offers a wide range of programs in various fields, providing students with opportunities for growth and success.</p>
     
    </div>
  );
};

export default HomeR;
