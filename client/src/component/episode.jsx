import React from "react";
import { Container } from "react-bootstrap";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import DetailsDescription from "../component/DetailSeries";
import { API } from "../config/api";

function Episode() {
  let {id} = useParams();

  let { data: episode } = useQuery("episode", async () => {
    const response = await API.get(`/film/1/episode`);
    return response.data.data;
  });
 
  return (
        <>
          
          <Container className="d-flex justify-content-center">
            <DetailsDescription
              titleeps={episode.title}
              imageUrleps={episode.thumbnail}
              linkeps={episode.link }
              id={id}
              episode={episode}
            />
          </Container>
        </>
  );
}

export default Episode;