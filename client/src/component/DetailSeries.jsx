import React from "react";
import { Carousel } from "react-bootstrap";
import hero from "../image/heroseries.png";
import bg from "../image/bg.png";
import ReactPlayer from 'react-player';


function DetailDescription ({ title, year, imageUrl, description, link, id}) {
  return (
    <>
    <div className="container-fluid m-0 p-0 bg-black">
    <ReactPlayer url={link} width="100%" height="315" />
    {/* <iframe width="100%" height="315" src="https://www.youtube.com/embed/{link}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe> */}
    {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/RH_2pLlHN8Y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}
      <div className="container-fluid d-flex p-5 bg-black">
        <img src={imageUrl}></img>
        <div className="ms-5 me-5 text-white">
          <h1 className="pb-3">{title}</h1>
          <p className="pb-3">{year}</p>
          <p>{description}</p>
        </div>
        <Carousel variant="dark" slide={false} style={{ width: '50%' }}>
          <Carousel.Item>
          <iframe width="100%" height="315" src="https://www.youtube.com/embed/{link}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
            <Carousel.Caption>
              <h5>Play</h5>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={bg}
              alt="Third slide"
            />
            <Carousel.Caption>
              <h5>Play</h5>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
    </>
  )
}

export default DetailDescription;