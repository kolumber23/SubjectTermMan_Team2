import React, { useContext, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import UserContext from '../AuthProvider';

function Login({ show, handleClose }) {

  const [loginState, setLoginState] = useState({ username: "", password: "" })

  const { login } = useContext(UserContext)

  const doClose = () => {
    setLoginState({ ...loginState, error: undefined })
    handleClose();
  };
  const handleLogin = async () => {
    const response = await login(loginState.email, loginState.password)
    if (response?.error) {
      setLoginState({ ...loginState, error: true })
    }
    else
    {
      doClose()
    }
  };

  return (
    <Modal show={show} onHide={() => doClose()}>

      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          {loginState.error && <Form.Group  style={{backgroundColor: "#f78484"}}>
            <Form.Label style={{display: "block", textAlign: "center"}}>Login error. Please check your login credentials.</Form.Label>
          </Form.Group>}
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              name="email"
              value={loginState.email}
              onChange={(e) => setLoginState({ ...loginState, email: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={loginState.password}
              onChange={(e) => setLoginState({ ...loginState, password: e.target.value })}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="primary"
          onClick={(e) => handleLogin(e)}
        >
          Login
        </Button>
      </Modal.Footer>

    </Modal>
  );
}

export default Login;