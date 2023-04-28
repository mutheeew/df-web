import React from "react";
import { Container } from "react-bootstrap";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import DetailsDescription from "../component/DetailSeries";
import { API } from "../config/api";

function Details() {
  const params = useParams();
  let id = params.id;

  let { data: film } = useQuery("filmCache", async () => {
    const response = await API.get(`/film/${id}`);
    console.log(response);
    return response.data.data;
  });
  return (
    <div style={{ backgroundColor: "black", color: "white" }}>
      {film === undefined ? (
        <p>Data Tidak Ditemukan</p>
      ) : (
        <>
          
          <Container className="d-flex justify-content-center">
            <DetailsDescription
              title={film.title}
              year={film.year}
              imageUrl={film.thumbnail}
              description={film.description}
              link={film.link }
              id={id}
            />
          </Container>
        </>
      )}
    </div>
  );
}

export default Details;