import React, {useState} from 'react'
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { Modal, Form, Row, Col, Button } from 'react-bootstrap'

import {API} from '../config/api'

export default function AddEpisode({closeEpisode, addEpisode}){
    const {id} = useParams()
    const [formEps, setFormEps] = useState({
        // thumbnail:"",
        // title:"",
        // link:"",
        // film_id:"",
    })

    const handleChange = (e) => {
        setFormEps({
            ...formEps,
            [e.target.name]:
            e.target.type === "file" ? e.target.files : e.target.value,
        })
    }

    const handleSubmitEps = useMutation(async(e)=>{
        try {
            e.preventDefault();

            const config = {
                headers: {
                    "Content-type": "multipart/form-data",
                }
            }

            const formData = new FormData()
            formData.set("thumbnail", formEps.thumbnail[0], formEps.thumbnail[0].name)
            formData.set("title", formEps.title)
            formData.set("linkFilm", formEps.linkFilm)
            formData.set('film_id', id);

            const response = await API.post('/episode', formData, config)
            console.log("Add episode suksess ", response)
        } catch (error) {
            e.preventDefault();
            console.log("add episode failed : ", error);
            console.log(formEps)
        }
    })

    return(
        <Modal Modal show={addEpisode} onHide={closeEpisode} animation={true} centered>
            <div className='bg-dark p-5 rounded'>
                <Row className='bg-dark'>
                    <Col sm={9} className="mb-3">
                        <Form.Control name="title" onChange={handleChange} placeholder="Title Episode" className="bg-dark text-white" />
                    </Col>
                    <Form.Group as={Col} className="mb-3">
                        <Form.Control name="thumbnail" onChange={handleChange} type="file" placeholder="Attach Thumbnail" className="bg-dark text-white" />
                    </Form.Group>
                </Row>
                <Form.Group className="mb-3 bg-dark">
                    <Form.Control name="link" onChange={handleChange} placeholder="Link Film" className="bg-dark text-white"/>
                </Form.Group>
                <Button type="submit" onClick={(e) => handleSubmitEps.mutate(e)} className='px-4 py-1 fw-bold bg-white text-danger'>Add Episode</Button>
            </div>
            
        </Modal>
        
    )
}