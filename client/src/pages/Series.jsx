import React, { useEffect, useState } from "react";
import Jumbotron from "../component/jumbotron";
import Card from "../component/card";
import { Dropdown } from "react-bootstrap";
import { API } from '../config/api'
import { useQuery } from "react-query";
import FetchFilm from "../component/listseries"


function Series() {

    return (
        <div style={{ background: "black" }}>
            <Jumbotron />
            <div style={{ background: "black", padding: "20px" }}>
                <p className="fs-6 fw-semibold text-white">Series</p>
                <div className="d-flex flex-wrap justify-content-center">
                   <FetchFilm/>
                </div>
            </div>
        </div>
    );
}

export default Series;
