import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const BestHotels = () => {
  const [hotels, setHotels] = useState([]);
  useEffect(() => {
    //will sort rating wise later on right now can only get 6
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/best-hotels`).then(
      (response) => {
        response.json().then((hotels) => setHotels(hotels));
      }
    );
  }, []);
  return (
    <Container maxWidth="lg" sx={{ margin: "10px auto" }}>
      <Typography variant="h4" align="center" marginTop="80px">
        Best Hotels
      </Typography>
      {hotels.length > 0 ? (
        <Grid container spacing={5} marginTop="10px">
          {hotels.map((hotel) => {
            return (
              <Grid item xs={12} sm={4}>
                <Card
                  sx={{ maxWidth: 345 }}
                  style={{ padding: "10px", marginBottom: "30px" }}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={hotel.images[0]}
                      alt="hotel picture"
                      sx={{ borderRadius: "5px" }}
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
                  </CardActionArea>
                  <CardActions>
                    <Link to={`/search-item/${hotel._id}`}>
                      <Button size="small" color="primary">
                        Explore Hotels
                      </Button>
                    </Link>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "1.5rem",
            marginBottom: "1.5rem",
          }}
        >
          <CircularProgress sx={{ color: "#284b63" }} />
        </Box>
      )}
    </Container>
    /* <Grid container spacing={5} marginTop="10px">
        <Grid item xs={12} sm={4}>
          <Card
            sx={{ maxWidth: 345 }}
            style={{ padding: "10px", marginBottom: "30px" }}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="https://t3.ftcdn.net/jpg/00/29/13/38/360_F_29133877_bfA2n7cWV53fto2BomyZ6pyRujJTBwjd.jpg"
                alt="green iguana"
                sx={{ borderRadius: "5px" }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Share
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card
            sx={{ maxWidth: 345 }}
            style={{ padding: "10px", marginBottom: "30px" }}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="https://t3.ftcdn.net/jpg/00/29/13/38/360_F_29133877_bfA2n7cWV53fto2BomyZ6pyRujJTBwjd.jpg"
                alt="green iguana"
                sx={{ borderRadius: "5px" }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Share
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card
            sx={{ maxWidth: 345 }}
            style={{ padding: "10px", marginBottom: "30px" }}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="https://t3.ftcdn.net/jpg/00/29/13/38/360_F_29133877_bfA2n7cWV53fto2BomyZ6pyRujJTBwjd.jpg"
                alt="green iguana"
                sx={{ borderRadius: "5px" }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Share
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card
            sx={{ maxWidth: 345 }}
            style={{ padding: "10px", marginBottom: "30px" }}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="https://t3.ftcdn.net/jpg/00/29/13/38/360_F_29133877_bfA2n7cWV53fto2BomyZ6pyRujJTBwjd.jpg"
                alt="green iguana"
                sx={{ borderRadius: "5px" }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Share
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card
            sx={{ maxWidth: 345 }}
            style={{ padding: "10px", marginBottom: "30px" }}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="https://t3.ftcdn.net/jpg/00/29/13/38/360_F_29133877_bfA2n7cWV53fto2BomyZ6pyRujJTBwjd.jpg"
                alt="green iguana"
                sx={{ borderRadius: "5px" }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Share
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card
            sx={{ maxWidth: 345 }}
            style={{ padding: "10px", marginBottom: "30px" }}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="https://t3.ftcdn.net/jpg/00/29/13/38/360_F_29133877_bfA2n7cWV53fto2BomyZ6pyRujJTBwjd.jpg"
                alt="green iguana"
                sx={{ borderRadius: "5px" }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Share
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card
            sx={{ maxWidth: 345 }}
            style={{ padding: "10px", marginBottom: "30px" }}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="https://t3.ftcdn.net/jpg/00/29/13/38/360_F_29133877_bfA2n7cWV53fto2BomyZ6pyRujJTBwjd.jpg"
                alt="green iguana"
                sx={{ borderRadius: "5px" }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Share
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card
            sx={{ maxWidth: 345 }}
            style={{ padding: "10px", marginBottom: "30px" }}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="https://t3.ftcdn.net/jpg/00/29/13/38/360_F_29133877_bfA2n7cWV53fto2BomyZ6pyRujJTBwjd.jpg"
                alt="green iguana"
                sx={{ borderRadius: "5px" }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Share
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid> */
    // </Container>
  );
};

export default BestHotels;
