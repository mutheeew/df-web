import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Jumbotron from "../component/jumbotron";
import ListMovies from "../component/listmovie"
import { UserContext } from '../context/user'
import Series from "../component/listseries";

function Homepages() {
  const navigate = useNavigate();
  const [userState] = useContext(UserContext);
 
  useEffect(() => {
    if (userState.user.role === 'admin') {
      navigate('/home');
    }
  });

  return (
    <div style={{ background: "black" }}>
      <Jumbotron />
      <div style={{ background: "black", padding: "20px" }}>
        <p className="fs-6 fw-semibold text-white">TV Shows</p>
        <div className="d-flex flex-wrap justify-content-center">
          <Series/>
        </div>
        <p className="fs-6 fw-semibold text-white">Movies</p>
        <div className="d-flex flex-wrap justify-content-center">
          <ListMovies/>
        </div>
      </div>
    </div>
  );
}

export default Homepages;
