import React, { useEffect, useState } from "react";
import Jumbotron from "../component/jumbotron";
import Card from "../component/card";
import { Dropdown } from "react-bootstrap";
import { API } from '../config/api'
import { useQuery } from "react-query";
import FetchFilm from "../component/listmovie"


function Movies() {

    return (
        <div style={{ background: "black" }}>
            <Jumbotron />
            <FetchFilm />
        </div>
    );
}

export default Movies;
