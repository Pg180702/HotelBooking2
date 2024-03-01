import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Cities from "./Cities";
import Destinations from "./Destinations";
import "../home.css";
import Search from "./Search";
import BestHotels from "./BestHotels";
import Footer from "./Footer";

const Home = () => {
  const [cities, setCities] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/api/v1/users/cities").then((response) =>
      response.json().then((cities) => setCities(cities))
    );
  }, []);
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1024 },
      items: 5,
      slidesToSlide: 2,
    },
    desktop: {
      breakpoint: { max: 1024, min: 800 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 800, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      <Box sx={{ marginTop: 15 }}>
        {/* <div>
          <img
            src="https://www.shutterstock.com/shutterstock/photos/1927169612/display_1500/stock-photo-summer-beach-background-palm-trees-against-blue-sky-banner-panorama-tropical-caribbean-travel-1927169612.jpg"
            style={{ objectFit: "cover", width: "100%" }}
          />
        </div> */}
        <Search />
        <h2 style={{ margin: "auto 1rem 1rem 1rem" }}>
          Destinations to Explore
        </h2>
        <Carousel responsive={responsive} itemClass="carousel-class">
          {cities.map((city) => {
            return <Cities key={city.id} city={city} />;
          })}
        </Carousel>
      </Box>
      <Destinations />
      <BestHotels />
      <Footer />
    </>
  );
};

export default Home;
