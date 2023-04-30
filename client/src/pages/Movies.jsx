import React from "react";
import Jumbotron from "../component/jumbotron";
import FetchFilm from "../component/listmovie"


function Movies() {

    return (
        <div style={{ background: "black" }}>
        <Jumbotron />
        <div style={{ background: "black", padding: "20px" }}>
            <p className="fs-6 fw-semibold text-white">Movies</p>
            <div className="d-flex flex-wrap justify-content-center">
               <FetchFilm/>
            </div>
        </div>
    </div>
    );
}

export default Movies;
