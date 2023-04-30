import React, {useContext, useState} from "react";
import { Button, Carousel } from "react-bootstrap";
import { UserContext } from "../context/user";
import AddEpisode from "../Admin/addepisode"
import ReactPlayer from 'react-player';
import { API } from "../config/api";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";


function DetailDescription ({ title, year, imageUrl, description, link}) {
  let {id} = useParams();
  const [state] = useContext(UserContext)
  const [addEpisode, setAddEpisode] = useState(false)
  const openEpisode = () => {
    setAddEpisode(true);
  };
  
  const closeEpisode = () => {
    setAddEpisode(false);
  };

  let { data: episode } = useQuery("episode", async () => {
    const response = await API.get(`/film/${id}/episode`);
    return response.data.data;
  });

  console.log(id)
  console.log(episode)



  return (
    <div className="container-fluid">
      <div className="container-fluid m-0 p-0 bg-black">
        <ReactPlayer url={link} width="100%" />
        {/* <iframe width="100%" height="315" src="https://www.youtube.com/embed/{link}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe> */}
        {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/RH_2pLlHN8Y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}
        <div className="d-flex justify-content-end py-3">
          {state.isLogin && state.user.role==='admin' &&(
            <>
              <Button
                size="sm"
                className="px-4 py-1 fw-bold bg-white text-danger"
                onClick={openEpisode}>
                Episode
              </Button>
              <AddEpisode
                addEpisode={addEpisode}
                closeEpisode={closeEpisode}
              />
            </>
          )}
        </div>
        <div className="container d-flex bg-black justify-content-between gap-3">
          <div>
            <img src={imageUrl}></img>
          </div>
          <div className="text-white">
            <h1 className="pb-3">{title}</h1>
            <p className="pb-3">{year}</p>
            <div className="">
            <p className="overflow-auto" style={{ width: '80%', height:'200px' }}>{description}</p>
            </div>
          </div>
          <div className="flex-fill">
          <Carousel variant="dark" slide={false} style={{ width: '100%', height:'100%' }}>
            {episode?.map((data, i) => (
              <Carousel.Item key={i}>
                <ReactPlayer url={data?.linkFilm} light={`${data?.thumbnail}`}width="80%" height="300px" />
                <Carousel.Caption>
                  <h5>{data.title}</h5>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
            </Carousel>
          </div>
            
        </div>
      </div>
    </div>
  )
}

export default DetailDescription;