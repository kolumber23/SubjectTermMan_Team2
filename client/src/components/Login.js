import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const Login = ({ onLogin }) => {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState(""); // State to track user role

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform authentication logic
    // For simplicity, let's assume the login is successful
    // You need to determine the user's role and set it accordingly
    const role = determineUserRole(username); // Implement this function
    setUserRole(role);
    onLogin(username, role);
    handleClose(); // Close the modal after login
  };

  // Function to determine user role based on username
  const determineUserRole = (username) => {
    // Implement your logic to determine the user's role
    // For example, you can check if the username belongs to a teacher or a student
    // You can fetch this information from your backend or any other source
    // For demonstration purposes, let's assume all usernames ending with "teacher" are teachers
    // and all others are students
    if (username.toLowerCase().endsWith("teacher")) {
      return "teacher";
    } else {
      return "student";
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Login
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Login;
