import { Routes, Route, useNavigate } from "react-router-dom";
import {useState, useEffect, useContext } from "react";
import React from "react";
import Navbars from "./component/Navbar";
import Homepages from "./pages/Home";
import Series from "./pages/Series";
import Movies from "./pages/Movies";
import Profil from "./pages/profil"
import Payment from "./pages/payment"
import Details from "./pages/Details";
import Home from "./Admin/home";
import Transaction from "./Admin/transaction";
import AddFilm from "./Admin/addfilm"
import UpdateFilm from "./Admin/updatefilm";

import {UserContext} from './context/user'
import {PrivateRouteAdmin, PrivateRouteLogin, PrivateRouteUser} from './component/privateroute'
import { API, setAuthToken } from './config/api';


const App = () =>  {
  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true)

  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');
      console.log("check user success: ", response)
      let payload = response.data.data;
      payload.token = localStorage.token;
      dispatch({
        type : 'USER_SUCCESS',
        payload,
      });
      setIsLoading(false)
    } catch (error) {
      console.log("check user failed: ", error);
      dispatch({
        type: 'AUTH_ERROR',
      });
      setIsLoading(false)
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      checkUser();
    } else {
      setIsLoading(false)
    }
  }, []);

  useEffect(() => {
    // Redirect Auth but just when isLoading is false
    if (!isLoading) {
      if (state.isLogin === false) {
        alert("Login dulu bosss")
        navigate('/');
      }
    }
  }, [isLoading]);
  
  return isLoading ? null : (
    <>
      <Navbars />
      <Routes>
        <Route path="/" element={<Homepages />} />
        <Route path="/series" element={<Series />} />
        <Route path="/movies" element={<Movies />} />
        <Route element={<PrivateRouteLogin/>}>
          <Route element={<PrivateRouteUser />}>
            <Route path="/profile" element={<Profil />} />
            <Route path="/play/:id" element={<Details />} />
            <Route path="/payment" element={<Payment />} />
          </Route>
          <Route element={<PrivateRouteAdmin />}>
            <Route path="/update-film/:id" element={<UpdateFilm />} />
            <Route path="/play-admin/:id" element={<Details />} />
            <Route path="/home" element={<Home />} /> 
            <Route path="/transaction" element={<Transaction />} />
            <Route path="/addfilm" element={<AddFilm />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
