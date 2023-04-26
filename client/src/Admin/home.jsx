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
                    {/* <Dropdown>
                    <Dropdown.Toggle>
                        Dropdown Button
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown> */}
                    <a className='btn btn-danger' href="/addfilm">Add Film</a>
                </div>
            
            <Series linkto={'/detailseries'}/>
            <ListMovies />
            </div>
        </>
    )
}

export default Home;