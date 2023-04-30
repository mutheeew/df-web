import React, {useContext, useState} from 'react';
import Series from '../component/listseries';
import ListMovies from '../component/listmovie';
import {useNavigate} from 'react-router';
import { Form, option } from 'react-bootstrap';

const Home = () => {
    const navigate = useNavigate();
    const [film, setFilm] = useState("movies")
    function handleChange(e) {
        setFilm(e.target.value)
    }

    return (
        <>
            <div style={{ background: "black", height:"100vh" }}>
                <div className="d-flex justify-content-between text-light p-5">
                    <div className='d-flex gap-3'>
                        <h1>List Film</h1>
                        <div>
                            <Form.Select style={{ background: "black" }} className='text-light px-2 my-2' onChange={handleChange}>
                                <option >Category</option>
                                <option value={"series"}>TV Shows</option>
                                <option value={"movies"}>Movies</option>
                            </Form.Select>
                        </div>
                    </div>
                    <div>
                    <a className='btn btn-danger' href="/addfilm">Add Film</a>
                    </div>
                    
                </div>
            {film === 'movies' ? <ListMovies/> : <Series/>}
            </div>
        </>
    )
}

export default Home;