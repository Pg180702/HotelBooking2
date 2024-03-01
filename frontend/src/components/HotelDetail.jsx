import {
  Button,
  Card,
  CardMedia,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { UserContext } from "./UserContext";
import { loadStripe } from "@stripe/stripe-js";
import Footer from "./Footer";

const HotelDetail = () => {
  const { id } = useParams();
  const { setUserInfo, userInfo } = useContext(UserContext);

  const [hotel, setHotel] = useState({});
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [adultCount, setAdultCount] = useState("");
  const [childCount, setChildCount] = useState("");
  const userid = userInfo.id;
  useEffect(() => {
    fetch(`http://localhost:4000/api/v1/users/search-item/${id}`).then(
      (response) => {
        response.json().then((hotel) => setHotel(hotel));
      }
    );
  }, []);
  const handleCheckInDate = (e) => {
    let value = new Date(e);
    let stringdate = value.toISOString();
    const indexofT = stringdate.indexOf("T");
    setCheckInDate(stringdate.substring(0, indexofT));
  };
  const handleCheckOutDate = (e) => {
    let value = new Date(e);
    console.log(value);
    let stringdate = value.toISOString();
    console.log(stringdate);
    const indexofT = stringdate.indexOf("T");
    setCheckOutDate(stringdate.substring(0, indexofT));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // const response = await fetch(
    //   "http://localhost:4000/api/v1/users/booking/user-id",
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       userid,
    //       checkInDate,
    //       checkOutDate,
    //       adultCount,
    //       childCount,
    //     }),
    //   }
    // );
    // if (response.ok) {
    //   alert("Data submitted successfully");
    // } else {
    //   alert("Problem in booking");
    // }
    const stripe = await loadStripe(
      "pk_test_51Oo4LkSH1zj9aeAXgpk3WSAMW62VpQz6dxbmjbGP4GhRYZDrBi6y5KAQBMoHhdTgqDyvxTxqXjq2msigk0e5qi4q00TYUmLVc9"
    );
    const reqbody = {
      checkInDate,
      checkOutDate,
      adultCount,
      childCount,
      id,
      userid,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await fetch(
      "http://localhost:4000/api/v1/users/create-checkout-session",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(reqbody),
      }
    );
    const session = await response.json();
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    if (result.error) {
      console.log(result.error);
    }
  };
  if (!hotel.images || hotel.images.length === 0) {
    return <div>Loading...</div>; // or some loading indicator
  }

  return (
    <>
      <div style={{ margin: "7%" }}>
        <Stack direction="column" spacing={2}>
          <Typography variant="h4">{hotel.title}</Typography>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Card>
                  <CardMedia
                    sx={{ height: { lg: 360, md: 500, sm: 700, xs: 360 } }}
                    image={hotel.images[0]}
                  ></CardMedia>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card>
                  <CardMedia
                    sx={{ height: { lg: 360, md: 500, sm: 700, xs: 360 } }}
                    image={hotel.images[0]}
                  ></CardMedia>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card>
                  <CardMedia
                    sx={{ height: { lg: 360, md: 500, sm: 700, xs: 360 } }}
                    image={hotel.images[0]}
                  ></CardMedia>
                </Card>
              </Grid>
            </Grid>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Card>
                  <CardMedia
                    sx={{ height: { lg: 360, md: 500, sm: 700, xs: 360 } }}
                    image={hotel.images[0]}
                  ></CardMedia>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card>
                  <CardMedia
                    sx={{ height: { lg: 360, md: 500, sm: 700, xs: 360 } }}
                    image={hotel.images[0]}
                  ></CardMedia>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card>
                  <CardMedia
                    sx={{ height: { lg: 360, md: 500, sm: 700, xs: 360 } }}
                    image={hotel.images[0]}
                  ></CardMedia>
                </Card>
              </Grid>
            </Grid>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Grid container spacing={2}>
              <Grid item sm={8} xs={12}>
                <Typography variant="p">{hotel.description}</Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <form onSubmit={handleSubmit}>
                  <Stack spacing={1}>
                    <DatePicker
                      label="Basic date picker"
                      name="checkInDate"
                      onChange={(e) => {
                        handleCheckInDate(e);
                      }}
                    />
                    <DatePicker
                      label="Basic date picker"
                      name="checkOutDate"
                      onChange={(e) => {
                        handleCheckOutDate(e);
                      }}
                    />
                    <TextField
                      label="Adult Count"
                      type="number"
                      defaultValue={1}
                      onChange={(e) => setAdultCount(e.target.value)}
                      InputProps={{ inputProps: { min: 1 } }}
                    />
                    <TextField
                      label="Child Count"
                      type="number"
                      defaultValue={0}
                      onChange={(e) => setChildCount(e.target.value)}
                      InputProps={{ inputProps: { min: 0 } }}
                    />
                    <Button type="submit" variant="contained">
                      Submit
                    </Button>
                  </Stack>
                </form>
              </Grid>
            </Grid>
          </div>
        </Stack>
      </div>
      <Footer />
    </>
  );
};

export default HotelDetail;
