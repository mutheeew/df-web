import React, { useEffect, useState } from "react";
import Card from "./card";
import { API } from '../config/api'


function Series() {
    const [dataFilm, setDataFilm] = useState([])

    const movies = async () => {
        const response = await API.get('/films')
        return response.data.data
    }
    useEffect(() => {
        movies().then(result =>{
            setDataFilm(result)
        })
    }, [])
    const FetchFilm = () => {
        return dataFilm
        .filter(film => film.category_id === 1)
        .map((film, i) => {
            return(
                <>
                    <Card
                    id={film.id}
                    link={film.link}
                    title={film.title}
                    year={film.year}
                    imageUrl={film.thumbnail}
                    />
                </>
            )
        })
    }

    return (
        <div style={{ background: "black" }}>
            <div style={{ background: "black", padding: "20px" }}>
                <p className="fs-6 fw-semibold text-white">TV Series</p>
                <div className="d-flex flex-wrap justify-content-start">
                   <FetchFilm/>
                </div>
            </div>
        </div>
    );
}

export default Series;
