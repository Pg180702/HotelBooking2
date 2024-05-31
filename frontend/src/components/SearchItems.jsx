import {
  Box,
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
import CircularProgress from "@mui/material/CircularProgress";
import Footer from "./Footer";
//import { SearchContext } from "./SearchContext";
const SearchItems = () => {
  //onst { setDestination } = useContext(SearchContext);
  // useEffect(()=>{
  //   setDestination()
  // },[])
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const destination = useParams();
  const dest = destination.destination;
  console.log(destination);
  useEffect(() => {
    fetch(
      `https://hotelbooking2-9b1p.onrender.com/api/v1/users/search-items/${dest}`
    )
      .then((response) => {
        response.json().then((hotels) => {
          setHotels(hotels);
          setLoading(false);
          console.log(hotels);
        });
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    // console.log(hotels);
  }, [dest]);
  return (
    <>
      {!loading ? (
        <div
          style={{
            marginTop: 150,
            marginLeft: "10%",
            marginRight: "10%",
            marginBottom: "10%",
          }}
        >
          <Grid item container spacing={2}>
            {hotels.map((hotel, index) => {
              return (
                <Grid item xs={12} sm={4} key={hotel._id}>
                  <Card sx={{ maxWidth: 400 }}>
                    <CardMedia
                      sx={{ height: 200 }}
                      image={hotel.images[0]}
                      title="green iguana"
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        fontWeight="bold"
                      >
                        {hotel.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {hotel.description.substring(0, 200)}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Link to={`/search-item/${hotel._id}`}>
                        <Button size="small">Explore Hotel</Button>
                      </Link>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </div>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 500,
            backgroundColor: "red",
          }}
        >
          <CircularProgress sx={{ color: "#284b63" }} />
        </Box>
      )}

      {/* <Footer /> */}
    </>
  );
};

export default SearchItems;
