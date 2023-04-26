import React, { useEffect, useState } from "react";
import Card from "../component/card";
import { API } from '../config/api'


function ListMovies() {
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
        .filter(film => film.category_id === 2)
        .map((film, i) => {
            return(
                <>
                    <Card
                    id={film.id}
                    title={film.title}
                    year={film.year}
                    imageUrl={film.thumbnail}
                    link={film.link}
                    description={film.description}
                    />
                </>
            )
        })
    }

    return (
        <div style={{ background: "black" }}>
            <div style={{ background: "black", padding: "20px" }}>
                <p className="fs-6 fw-semibold text-white">Movies</p>
                <div className="d-flex flex-wrap justify-content-start">
                   <FetchFilm/>
                </div>
            </div>
        </div>
    );
}

export default ListMovies;
