import React, { useEffect, useState } from "react";
import Jumbotron from "../component/jumbotron";
import Card from "../component/card";
import { Dropdown } from "react-bootstrap";
import { API } from '../config/api'
import { useQuery } from "react-query";
import FetchFilm from "../component/series"


function Series() {
    // const [dataFilm, setDataFilm] = useState([])

    // const films = async () => {
    //     const response = await API.get('/films')
    //     return response.data.data
    // }
    // useEffect(() => {
    //     films().then(result =>{
    //         setDataFilm(result)
    //     })
    // }, [])
    // const FetchFilm = () => {
    //     return dataFilm
    //     .filter(film => film.category_id === 1)
    //     .map((film, i) => {
    //         return(
    //             <>
    //                 <Card
    //                 title={film.title}
    //                 year={film.year}
    //                 imageUrl={film.thumbnail}
    //             />
    //             </>
    //         )
    //     })
    // }

    return (
        <div style={{ background: "black" }}>
            <Jumbotron />
            {/* {validadmin? (
                <>
                <h1>List Film</h1>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Category
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <button>Add Film</button>
                </>
            ):(null)} */}
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
