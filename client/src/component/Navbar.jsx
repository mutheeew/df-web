import React, {useState, useContext } from "react";
import { UserContext } from "../context/user";
import {
  Navbar,
  Nav,
  Container,
  Button,
  Dropdown,
} from "react-bootstrap";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Logo from "../image/logo.png";
import Profile from "../image/profile.jpg";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { CgProfile} from "react-icons/cg";
import { MdPayment, MdLogout } from "react-icons/md";

function Navbars() {
  const [state, dispatch] = useContext(UserContext)
  console.log("ini state: ", state)

  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);

  let navigate = useNavigate();

  //validasi Login
  const [validlogin, setValidlogin] = useState(false);
  const [validadmin, setValidadmin] = useState(false);

  // Logout
  const logout = () => {
    dispatch({type: "LOGOUT"})
    setValidlogin(false);
    setValidadmin(false)
    navigate("/");
  };

  //   handle login form
  const openLogin = () => {
    setLogin(true);
  };
  
  const closeLogin = () => {
    setLogin(false);
  };

  //   handle register form
  const openRegister = () => {
    setRegister(true);
  };
  
  const closeRegister = () => {
    setRegister(false);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" sticky="top">
        <Container className="d-flex align-items-center">
          <Nav className="fw-semibold">
            <Nav.Link>
              <NavLink
                to="/"
                style={{
                  textDecoration: "none", color:"white",
                }}>
                Home
              </NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink
                to="/series"
                style={{textDecoration: "none", color:"white"}}>
                Tv Show
              </NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink
                to="/movies"
                style={{textDecoration: "none", color:"white"}}>
                Movies
              </NavLink>
            </Nav.Link>
          </Nav>
          <NavLink to="/">
            <img src={Logo} alt="dumbflix"/>
          </NavLink>
          <Nav className="gap-3">
            {state.isLogin && state.user.role==='admin' &&(
              <Dropdown>
              <Dropdown.Toggle className="btn-dark" ><img src={Profile} className="rounded-50" style={{width:"45px", height:"45px", borderRadius:"100%"}} ></img> </Dropdown.Toggle>
              <Dropdown.Menu className="bg-dark mt-4 ms-4">
                <Dropdown.Item className="d-flex align-items-center">
                  <Link
                    to="/addfilm"
                    className="text-white fw-semibold text-decoration-none">
                    <CgProfile
                      color="red"
                      style={{ fontSize: "20px" }}
                      className="me-2"
                    />Film
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item className="d-flex align-items-center">
                  <Link
                    to="/transaction"
                    className="text-white fw-semibold text-decoration-none">
                    <CgProfile
                      color="red"
                      style={{ fontSize: "20px" }}
                      className="me-2"
                    />Transaction
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item
                  className="d-flex align-items-center gap-2 text-white fw-semibold"
                  onClick={logout}>
                  <MdLogout color="red" style={{ fontSize: "20px" }} />
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            )}
           {state.isLogin && state.user.role==='costumer' && (
              <Dropdown>
                <Dropdown.Toggle className="btn-dark" >
                  <img src={Profile} className="rounded-50" style={{width:"45px", height:"45px", borderRadius:"100%"}} ></img> 
                </Dropdown.Toggle>
                <Dropdown.Menu className="bg-dark mt-4 ms-4">
                  <Dropdown.Item className="d-flex align-items-center">
                    <Link
                      to="/profile"
                      className="text-white fw-semibold text-decoration-none">
                      <CgProfile
                        color="red"
                        style={{ fontSize: "20px" }}
                        className="me-2"
                      />
                      Profile
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item className="d-flex align-items-center gap-2 text-white fw-semibold fs-6 pb-2 border-bottom border-white">
                    <Link
                      to="/payment"
                      className="text-white fw-semibold text-decoration-none">
                      <MdPayment
                        color="red"
                        style={{ fontSize: "20px" }}
                        className="me-2"
                      />
                      Pay
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="d-flex align-items-center gap-2 text-white fw-semibold"
                    onClick={logout}>
                    <MdLogout color="red" style={{ fontSize: "20px" }} />
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              )}
              {!state.isLogin &&(
                <>
                <RegisterForm
                  register={register}
                  closeRegister={closeRegister}
                  openLogin={openLogin}
                />
                <Button
                  size="sm"
                  className="px-4 py-1 fw-bold bg-white text-danger"
                  onClick={openRegister}>
                  Register
                </Button>
                <LoginForm
                  login={login}
                  closeLogin={closeLogin}
                  openRegister={openRegister}
                  setValidlogin={setValidlogin}
                  setValidadmin={setValidadmin}
                />
                <Button
                  variant="danger"
                  size="sm"
                  className="px-4 py-1 fw-bold"
                  onClick={openLogin}>
                  Login
                </Button>
                </>
              )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Navbars;
