import React, {useContext} from "react";
import {useQuery} from 'react-query';
import "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../detail.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import Profile from "../image/profile.jpg";
import { MdAccountCircle } from "react-icons/md";
import { FiMail } from "react-icons/fi";
import { RiVipLine } from "react-icons/ri";
import { TbGenderBigender } from "react-icons/tb";
import { MdLocalPhone } from "react-icons/md";
import { SiGooglemaps } from "react-icons/si";
import Button from "react-bootstrap/Button";
import { UserContext } from "../context/user";

import {API} from '../config/api'

function Profil() {
  const [state] = useContext(UserContext);

  let {data : profile} = useQuery('userCache', async () => {
    const response = await API.get(`/user/${state.user.id}`);
    console.log(response)
    return response.data.data;
  });

  return (
    <div
      style={{ background: "black", height: "90.5vh" }}
      className="d-flex align-items-center justify-content-center">
      <div className="bg-dark py-5 rounded">
        <Row className="justify-content-around">
          <Col className="col-5">
              <h4 className="mb-5 text-white">Personal Info</h4>
            <div className="d-flex mb-3">
              <MdAccountCircle className="MdAccountCircle me-3" />
              <span>
                <p className="text-white mb-0">
                  {profile?.fullname}
                </p>
                <p
                  className="text-muted mt-0">
                  Full name
                </p>
              </span>
            </div>

            <div className="d-flex mb-3">
              <FiMail className="FiMail me-3" />
              <span>
                <p className="text-white  mb-0">
                  {profile?.email}
                </p>
                <p
                  className="text-muted">
                  Email
                </p>
              </span>
            </div>

            <div className="d-flex mb-3">
              <RiVipLine className="RiVipLine me-3" />
              <span>
                <p className="text-white  mb-0" >
                  Active
                </p>
                <p
                  className="text-muted">
                  Status
                </p>
              </span>
            </div>

            <div className="d-flex mb-3">
              <TbGenderBigender className="TbGenderBigender me-3" />
              <span>
                <p className="text-white mb-0" >
                    {profile?.gender}
                </p>
                <p
                  className="text-muted">
                  Gender
                </p>
              </span>
            </div>

            <div className="d-flex mb-3">
              <MdLocalPhone className="MdLocalPhone me-3" />
              <span>
                <p className="text-white mb-0" style={{ fontSize: "14px" }}>
                  {profile?.phone}
                </p>
                <p
                  className="text-muted">
                  Mobile Phone
                </p>
              </span>
            </div>

            <div className="d-flex">
              <SiGooglemaps className="SiGooglemaps me-3" />
              <span >
                <p className="text-white mb-0">
                  {profile?.address}  
                </p>
                <p
                  className="text-muted">
                  Address
                </p>
              </span>
            </div>
          </Col>
          <Col className="col-5">
            <img className="img-fluid"
              src={""}
              alt="Profile" ></img>
            <Button
              className="mt-3 btn-danger" style={{width:"300px"}}>
              Change Photo Profile
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Profil;
