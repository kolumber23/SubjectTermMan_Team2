import { useState, useEffect, useMemo, useRef } from 'react';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useAuth } from '../AuthContext';
import Form from "react-bootstrap/Form";
import Box from '@mui/material/Box';

function LoginModal(props) {
  const { user, login, logout } = useAuth();
  const { isOpen, closeModalCallback } = props;
  const [loginParams, setLoginParams] = useState({ state: "initial", username: "", password: "" })

  const inputDisabled = useMemo(() => loginParams.state === "sent", [loginParams.state])

  async function doLogin() {
    updateValue({ state: "sent" })
    const result = await login(loginParams.username, loginParams.password)
    if (result.error) {
      updateValue({ state: "error", error: result.error })
    }
    else {
      closeModal()
    }
  }

  function closeModal() {
    setLoginParams({ state: "initial", username: "", password: "" })
    closeModalCallback()
  }
  function updateValue(newValues) {
    setLoginParams({ ...loginParams, ...newValues })
  }
  return (
    <Modal show={isOpen} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loginParams.error && <Box component="section" sx={{ p: 2, bgcolor: '#fc8279' }}>
          {loginParams.error}
        </Box>
        }
        <Form.Control
          style={{ width: 300, height: 30 }}
          type="textarea"
          disabled={inputDisabled}
          defaultValue={loginParams.username}
          onChange={(event) => updateValue({ username: event.target.value })}
        />
        <Form.Control
          style={{ width: 300, height: 30 }}
          type="password"
          disabled={inputDisabled}
          defaultValue={loginParams.password}
          onChange={(event) => updateValue({ password: event.target.value })}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary"
          onClick={closeModal}>
          Close
        </Button>
        <Button variant="primary"
          onClick={doLogin}
          disabled={inputDisabled}>
          Login
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
export default LoginModal;