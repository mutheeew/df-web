import React, {useContext, useState} from 'react';
import Series from '../component/series';
import ListMovies from '../component/listmovie';
import {useNavigate} from 'react-router';
import { Dropdown } from 'react-bootstrap';

const Home = () => {
    const navigate = useNavigate();

    return (
        <>
            <div style={{ background: "black" }}>
                <div className='d-flex py-5 justify-content-end mx-5'>
                    <a className='btn btn-danger' href="/addfilm">Add Film</a>
                </div>
            
            <Series linkto={'/detailseries'}/>
            <ListMovies />
            </div>
        </>
    )
}

export default Home;