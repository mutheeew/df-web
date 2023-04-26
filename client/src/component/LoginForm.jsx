import React, { useState, useContext } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/user';

import { API, setAuthToken } from '../config/api';


function LoginForm({ login, closeLogin, openRegister, setValidlogin, setValidadmin }) {
  let navigate = useNavigate();

  const [_, dispatch] = useContext(UserContext);

  const [message, setMessage] = useState(null)
  const [form, setForm] = useState({
    email : "",
    password : "",
  });

  const { email, password} = form;

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = useMutation(async (e) => {
    try {
      e.preventDefault();
      const response = await API.post('/login', form);

      console.log("login success: ", response);

      dispatch({
        type : 'LOGIN_SUCCESS',
        payload : response.data.data,
      });

      setAuthToken(localStorage.token);

      if (response.data.data.role === 'admin'){
        // console.log("ini admin")
        setValidadmin(true);
        setValidlogin(true);
        closeLogin();
      } else {
        // console.log("ini costumer")
        setValidlogin(true);
      }

      const alert = (
        <Alert variant ="succes">
          Login Succes YAAAASSSSSHHH
        </Alert>
      );
      setMessage(alert);
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Login failed
        </Alert>
      );
      setMessage(alert);
      console.log("login failed : ", error);
    }
  });


  //handle to registe
  const gotoRegister = () => {
    closeLogin();
    openRegister();
  };

  return (
    <Modal show={login} onHide={closeLogin} animation={true} centered size="sm">
      <div className="text-white rounded" style={{ background: "#141414" }}>
        <Modal.Header className="border-0" style={{ marginBottom: "-10px" }}>
          <Modal.Title className="fs-5 fw-semibold">Login</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-2">
          <Form onSubmit={(e) => handleLogin.mutate(e)}>
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                placeholder="Email"
                className="bg-dark text-white"
                name="email"
                value={email}
                onChange={handleOnChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                placeholder="Password"
                className="bg-dark text-white"
                name="password"
                value={password}
                onChange={handleOnChange}
              />
            </Form.Group>
            <Button
            type="submit"
              className="fw-bold"
              style={{ width: "250px" }}
              variant="danger">
              Login
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer
          className="flex justify-content-center border-0">
          
          <p style={{ fontSize: "12px" }} className="text-muted">
            Don't have an account ? Klik
            <a
              onClick={gotoRegister}
              style={{
                textDecoration: "none",
                color: "gray",
                cursor: "pointer",
              }}
              className="fw-semibold"> Here
            </a>
          </p>
        </Modal.Footer>
      </div>
    </Modal>
  );
}

export default LoginForm;
// 