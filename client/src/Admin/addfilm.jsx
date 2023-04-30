import React, {useState, useEffect} from "react";
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import {Button, Form, Row, Col} from 'react-bootstrap';

import { API } from '../config/api';

const AddFilm = () => {
// handle add and remove episode's form
const navigate = useNavigate()
    const [episodes, setEpisodes] = useState([]);

    const handleAddEpisode = () => {
        setEpisodes([...episodes, {}]);
    };

    // const handleRemoveEpisode = (index) => {
    //     const newEpisodes = [...episodes];
    //     newEpisodes.splice(index, 1);
    //     setEpisodes(newEpisodes);
    // };
// close
    // const [imageUrl, setImageUrl] = useState();
    const [categoryId, setCategoryId] = useState([]);
    const [form, setForm] = useState({
        thumbnail : "",
        title : "",
        year : "",
        description : "",
        category_id : "",
        link : "",
    });
    
    const handleChange = (e) => {
        setForm({
        ...form,
        [e.target.name]:
            e.target.type === "file" ? e.target.files : e.target.value,
        });
    };

    let { data: categories, refetch } = useQuery("categoriesCache", async () => {
        const response = await API.get("/categories");
        return response.data.data;
    });

    useEffect(() => {
        setCategoryId(categories);
    }, [categories]);

    // const handleEpisode = (e) => {
    //     setEpisode({
    //     ...episode,
    //     [e.target.name]:
    //         e.target.type === "file" ? e.target.files : e.target.value,
    //     });
    //     if (e.target.type === "file") {
    //     let url = URL.createObjectURL(e.target.files[0]);
    //     setImageUrl(url);
    //     }
    // };

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();

            const config = {
                headers: {
                "Content-type": "multipart/form-data",
                },
            };

        const formData = new FormData();
        formData.set("thumbnail", form.thumbnail[0], form.thumbnail[0].name);
        formData.set("title", form.title);
        formData.set("description", form.description);
        formData.set("year", form.year);
        formData.set("category_id", form.category_id);
        formData.set("link", form.link);

        // const formEpisode = new formEpisode();
        // formEpisode.set("thumbnail", episode.thumbnail[0], episode.thumbnail[0].name);
        // formEpisode.set("title", episode.title);
        // formEpisode.set("link", episode.title);

        const response = await API.post('/film', formData, config);
        console.log("add movies success : ", response);
        alert("Sukses menambahkan uhuyyyy")
        navigate("/home")

        } catch (error) {
            e.preventDefault();
            console.log("add film failed : ", error);
            console.log(form)
        }

    });

    return (
        <div className="bg-black">
            <Form onSubmit={(e) => handleSubmit.mutate(e)} className="container py-5" style={{width:"60vw"}}>
                <h1 className="text-light my-5">Add Film</h1>
                <Row>
                    <Col sm={9} className="mb-3">
                        <Form.Control name="title" value={form.title} type="text" placeholder="Enter Title" className="bg-dark text-white" onChange={handleChange}/>
                    </Col>
                    <Col className="mb-3">
                        <Form.Control name="thumbnail" type="file" placeholder="Attach Thumbnail" className="bg-dark text-white" onChange={handleChange}/>
                    </Col>
                </Row>
                <Form.Group className="mb-3">
                    <Form.Control name="year" value={form.year} placeholder="Year" className="bg-dark text-white" onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Select defaultValue="Category" name="category_id" value={form.category_id} onChange={handleChange} className="bg-dark text-white">
                    <option value="">Category</option>
                    {categories?.map((item, index) => (
                        <option value={item?.id} >{item?.name}</option>
                    ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control as="textarea" name="description" value={form.description} placeholder="Description" onChange={handleChange} className="bg-dark text-white"/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control placeholder="Link Film" name="link" value={form.link} onChange={handleChange} className="bg-dark text-white"/>
                </Form.Group>
                {episodes.map((episode, index) => (
                    <div key={index}>
                        <Row>
                            <Col sm={9} className="mb-3">
                                <Form.Control name="eps" type="eps" placeholder="Title Episode" className="bg-dark text-white" />
                            </Col>
                            <Form.Group as={Col} className="mb-3">
                                <Form.Control name="thumbnailEps"  type="file" placeholder="Attach Thumbnail" className="bg-dark text-white" />
                            </Form.Group>
                        </Row>
                        <Form.Group className="mb-3">
                            <Form.Control name="link" placeholder="Link Film" className="bg-dark text-white"/>
                        </Form.Group>
                        {/* <Button className="btn btn-dark border border-light" type="button" onClick={() => handleRemoveEpisode(index)}>
                            -
                        </Button> */}
                    </div>
                ))}
                <Button className="btn btn-dark border border-light" type="button" onClick={handleAddEpisode} style={{width:"58vw"}}>+</Button>
                <div className="mt-3">
                    <Button className="btn btn-danger px-5 " type="submit">Save</Button>
                </div>
            </Form>
        </div>
    )
};

export default AddFilm;
