import React, {useState} from "react";
import { Modal, Button, Form, CloseButton, Alert } from "react-bootstrap";
import { useMutation } from 'react-query';
import { API } from '../config/api';

function RegisterForm({ register, closeRegister, openLogin }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
    fullname: "",
    gender: "",
    phone: "",
    address: ""
  });

  const { fullname, email, password, gender, phone, address } = form;

  // mengubah nilai state pada saat terjadi perubahan di form
  const handleOnChange = (e) => {
    // setState here
    setForm({
      ...form,
      [e.target.name]: e.target.value});
  };

  const [message, setMessage] = useState(null);
 
  
  const handleRegister = useMutation(async (e) => {
    try {
      e.preventDefault();
  
      const response = await API.post('/register', form);
  
      console.log("register success : ", response)
  
      const alert = (
        <Alert variant="success" className="py-1">
          Register success!
        </Alert>
      );
      setMessage(alert);
      setForm({
        email: "",
        password: "",
        fullname: "",
        gender: "",
        phone: "",
        address: ""
      });
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed to register!
        </Alert>
      );
      setMessage(alert);
      console.log("register failed : ", error);
    }
    closeRegister();
  });

  const gotoLogin = () => {
    closeRegister();
    openLogin();
  };

  return (
    <Modal show={register} onHide={closeRegister} animation={true} centered size="sm">
      <div className="text-white rounded bg-dark">
        <Modal.Header className="border-0 pb-1">
          <Modal.Title className="fs-5 fw-semibold">Register</Modal.Title>
          <CloseButton variant="white" onClick={closeRegister} />
        </Modal.Header>
        <Modal.Body className="mx-2">
          <Form onSubmit={(e) => handleRegister.mutate(e)}>
            <Form.Group className="mb-3">
              <Form.Control type="email"  className="bg-dark text-white"
                name="email"
                placeholder="Email"
                value={email}
                onChange={handleOnChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="password" className="bg-dark text-white"
                name="password"
                placeholder="Password"
                value={password}
                onChange={handleOnChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="fullname"
                placeholder="Full Name"
                className="bg-dark text-white"
                value={fullname}
                onChange={handleOnChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Select
                type="text"
                name="gender"
                placeholder="Gender"
                className="bg-dark text-white"
                value={gender}
                onChange={handleOnChange}>
                <option>Gender</option>
                <option>Male</option>
                <option>Female</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="tel"
                name="phone"
                placeholder="Phone"
                className="bg-dark text-white"
                value={phone}
                onChange={handleOnChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="address"
                placeholder="Address"
                className="bg-dark text-white"
                value={address}
                onChange={handleOnChange}
              />
            </Form.Group>
            <Button type="submit"
            size="md"
            className="px-4 py-2 fw-bold bg-white text-danger"
            style={{ width: "250px" }}>
            Register
          </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer
          className="flex justify-content-center border-0"
          style={{ marginTop: "-25px" }}>
          <p style={{ fontSize: "12px" }} className="text-muted">
            Already have an account ? Klik 
            <a
              onClick={gotoLogin}
              style={{textDecoration: "none"}}
              className="fw-semibold"> Here
            </a>
          </p>
        </Modal.Footer>
      </div>
    </Modal>
  );
}

export default RegisterForm;
// 