import React from "react";
import { Button, Carousel } from "react-bootstrap";
import bg from "../image/bg.png";
import witcher from "../image/witcher.png";
import heroseries from "../image/heroseries.png";
import lecasa from "../image/lecasa.png";
import joker from "../image/herojoker.png";
import titlejoker from "../image/gothic-joker.png";
import { Link } from "react-router-dom";

function Junbotron() {

  return (
    <Carousel fade>
      <Carousel.Item>
        <img className="d-block w-100" src={bg} alt="First slide" />
        <Carousel.Caption className="d-flex flex-column align-items-start justify-content-center w-100 h-100">
          <img
            className="mb-2"
            style={{ width: "auto", maxWidth: "500px" }}
            src={witcher}
            alt="title"
          />
          <div>
            <p
              className="my-2 col-7 text-start">
              Geralt of Rivia, a solitary monster hunter, struggles to find his
              place in a world where people often prove more wicked than beast
            </p>
            <div className="d-flex align-items-center gap-3">
              <p>
                2019
              </p>
              <p
                className="border border-1 px-2 rounded shadow-sm">
                TV Series
              </p>
            </div>
          </div>
          <Link to="/detailseries">
          <Button  className="px-5 fw-semibold shadow-sm" variant="danger"> 
            WATCH NOW! 
          </Button>
          </Link>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={heroseries} alt="First slide" />
        <Carousel.Caption className="d-flex flex-column align-items-start justify-content-center w-100 h-100">
          <img src={lecasa} className="mb-2"  alt="title"/>
          <div>
            <p className="my-2 col-4 text-start">
              Money Heist is a crime drama on Netflix - originally called La
              Casa de Papel. Money Heist season 3 has just been released by the
              streaming service. The plot reads: "Eight thieves take hostages
              and lock themselves in the Royal Mint of Spain as a criminal
              mastermind manipulates the police to carry out his plan."
            </p>
            <div className="d-flex align-items-center gap-3">
              <p>
                2017
              </p>
              <p className="border border-1 px-2 rounded shadow-sm">
                TV Series
              </p>
            </div>
          </div>
          <Button className="px-5 fw-semibold shadow-sm" variant="danger">
            WATCH NOW!
          </Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={joker} alt="First slide" />
        <Carousel.Caption className="d-flex flex-column align-items-start justify-content-center w-100 h-100">
          <img
            className="mb-2"
            style={{ width: "auto", maxWidth: "500px" }}
            src={titlejoker}
            alt="title"
          />
          <div>
            <p
              className="my-2 col-4 text-start">
              In Gotham City, mentally troubled comedian Arthur Fleck is
              disregarded and mistreated by society. He then embarks on a
              downward spiral of revolution and bloody crime. This path brings
              him face-to-face with his alter-ego: the Joker.
            </p>
            <div className="d-flex align-items-center gap-3">
              <p
                style={{
                  fontSize: "14px",
                  textShadow: "0px 2px 3px gray",
                }}>
                2019
              </p>
              <p
                className="border border-1 px-2 rounded shadow-sm"
                style={{
                  fontSize: "14px",
                  textShadow: "0px 2px 3px gray",
                }}>
                Movies
              </p>
            </div>
          </div>
          <Button className="px-5 fw-semibold shadow-sm" variant="danger">
            WATCH NOW!
          </Button>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Junbotron;
