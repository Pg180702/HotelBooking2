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
const cityData = [
  {
    name: "delhi",
    data: "https://static.toiimg.com/photo/msid-24245804,width-96,height-65.cms",
  },
  {
    name: "mumbai",
    data: "https://static.toiimg.com/thumb/msid-53891735,width-748,height-499,resizemode=4,imgsize-126102/.jpg",
  },
  {
    name: "bangalore",
    data: "https://www.shutterstock.com/image-photo/vidhan-soudha-bangalore-_-image-600nw-1433353757.jpg",
  },
  {
    name: "shimla",
    data: "https://t3.ftcdn.net/jpg/01/05/09/32/360_F_105093204_csAIVsj4UJPJJdWmamOjHThVdW9BdSN6.jpg",
  },
  {
    name: "manali",
    data: "https://images.unsplash.com/photo-1593181629936-11c609b8db9b?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWFuYWxpfGVufDB8fDB8fHww",
  },
  {
    name: "pune",
    data: "https://media.istockphoto.com/id/1320749212/photo/cityview.jpg?s=612x612&w=0&k=20&c=9ho0mNkHI8jhbagXIxPQDKmlgAW3MqIcuh1hJwungbI=",
  },
  {
    name: "dehradun",
    data: "https://media.istockphoto.com/id/1140128164/photo/mussoorie-landscape-in-cloudy-rainy-monsoon-season-stock-image.jpg?b=1&s=612x612&w=0&k=20&c=B7srJbaUEnZuhMligGEP2jO5KxdJeeXkd2WAwQbxuqA=",
  },
];
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
          {cityData.map((city) => {
            return <Cities city={city} />;
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
