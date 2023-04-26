import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Jumbotron from "../component/jumbotron";
import ListMovies from "../component/listmovie"
import { UserContext } from '../context/user'
import Card from "../component/series";

function Homepages() {
  const navigate = useNavigate();
  const [userState, modalDispatch] = useContext(UserContext);
 
  useEffect(() => {
    if (userState.user.role === 'admin') {
      navigate('/home');
    }
  });

  return (
    <div style={{ background: "black" }}>
      <Jumbotron />
      <Card/>
      <ListMovies />
    </div>
  );
}

export default Homepages;
