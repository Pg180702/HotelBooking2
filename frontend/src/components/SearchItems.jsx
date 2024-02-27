import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
//import { SearchContext } from "./SearchContext";
const SearchItems = () => {
  //onst { setDestination } = useContext(SearchContext);
  // useEffect(()=>{
  //   setDestination()
  // },[])
  const [hotels, setHotels] = useState([]);
  const destination = useParams();
  const dest = destination.destination;
  console.log(destination);
  useEffect(() => {
    fetch(`http://localhost:4000/api/v1/users/search-items/${dest}`).then(
      (response) => {
        response.json().then((hotels) => setHotels(hotels));
      }
    );
    console.log(hotels);
  }, []);
  return (
    <>
      <div
        style={{
          marginTop: 150,
          marginLeft: "10%",
          marginRight: "10%",
          marginBottom: "10%",
        }}
      >
        <Grid item container spacing={2}>
          {hotels.map((hotel, index) => (
            <Grid item xs={12} sm={4}>
              <Card sx={{ maxWidth: 400 }}>
                <CardMedia
                  sx={{ height: 200 }}
                  image={hotel.images[0]}
                  title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {hotel.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {hotel.description.substring(0, 200)}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link to={`/search-item/${hotel._id}`}>
                    <Button size="small">Learn More</Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};

export default SearchItems;
