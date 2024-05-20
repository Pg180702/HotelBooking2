import {
  Button,
  Card,
  CardMedia,
  Container,
  Box,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { UserContext } from "./UserContext";
import { loadStripe } from "@stripe/stripe-js";
import Footer from "./Footer";
import Modal from "@mui/material/Modal";
import ImageSlider from "./ImageSlider";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { sm: 400, xs: 300 },
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const HotelDetail = () => {
  const { id } = useParams();
  const { setUserInfo, userInfo } = useContext(UserContext);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    if (!username) alert("please login first");
    else {
      setRoomsToBook([]);
      setOpen(true);
    }
  };
  const adminusername = sessionStorage.getItem("username");
  const username = sessionStorage.getItem("userid");
  const handleClose = () => setOpen(false);
  const [hotel, setHotel] = useState({});
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [adultCount, setAdultCount] = useState("");
  const [childCount, setChildCount] = useState("");
  const [rooms, setRooms] = useState([]);
  const [checkOutDate2, setCheckOutDate2] = useState("");
  const [roomsToBook, setRoomsToBook] = useState([]);
  const userid = userInfo.id;
  useEffect(() => {
    fetch(
      `https://hotelbooking2-9b1p.onrender.com/api/v1/users/search-item/${id}`
    ).then((response) => {
      response.json().then((hotel) => setHotel(hotel));
    });
  }, []);
  useEffect(() => {
    handleHotel();
  }, [checkInDate]);
  const roomsArray = hotel.rooms;
  const handleHotel = async () => {
    console.log(checkOutDate);
    Promise.all(
      roomsArray.map((roomString) =>
        fetch(
          `https://hotelbooking2-9b1p.onrender.com/api/v1/users/get-roomdata/${roomString}?date=${checkOutDate2}`
        ).then((response) => response.json())
      )
    ).then((roomsData) => {
      // roomsData is an array of room objects received from fetch requests
      console.log(roomsData);
      setRooms((prevRooms) => [...prevRooms, ...roomsData]);
    });
    //console.log(rooms);
  };
  const handleCheckInDate = (e) => {
    let value = new Date(e);
    let stringdate = value.toISOString();
    setCheckOutDate2(stringdate);
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
    const token = sessionStorage.getItem("token");
    const reqbody = {
      checkInDate,
      checkOutDate,
      adultCount,
      childCount,
      id,
      userid,
      roomsToBook,
      token,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await fetch(
      "https://hotelbooking2-9b1p.onrender.com/api/v1/users/create-checkout-session",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(reqbody),
      }
    );
    // if (!response) alert("Kindly Login First");
    const session = await response.json();
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    if (result.error) {
      console.log(result.error);
    }
  };
  const handleCheckboxChange = (rd, roomNumber, price, isChecked) => {
    console.log(roomNumber);
    console.log(price);
    if (isChecked) {
      const room = { number: roomNumber, price: price, roomid: rd };
      setRoomsToBook((prevRooms) => [...prevRooms, room]);
    }
  };
  if (!hotel.images || hotel.images.length === 0) {
    return <div>Loading...</div>; // or some loading indicator
  }

  return (
    <>
      <div
        style={{
          marginLeft: "7%",
          marginBottom: "7%",
          marginRight: "7%",
          marginTop: "10%",
        }}
      >
        <Stack direction="column" spacing={2}>
          <Typography variant="h4">{hotel.title}</Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              maxWidth: "100%",
              width: "100%",
              height: { lg: 380, md: 500, sm: 350, xs: 300 },
              marginBottom: "1rem",
              marginTop: { xs: "2rem" },
            }}
          >
            <ImageSlider imagesArray={hotel.images} />
          </Box>
          {/* <div style={{ display: "flex", justifyContent: "center" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Card>
                  <CardMedia
                    sx={{
                      height: { lg: 360, md: 500, sm: 700, xs: 360 },
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
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
          </div> */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Grid container spacing={2}>
              <Grid item sm={8} xs={12}>
                <Typography variant="p">{hotel.description}</Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Stack spacing={1}>
                  <DatePicker
                    label="Check In Date"
                    name="checkInDate"
                    onChange={(e) => {
                      handleCheckInDate(e);
                    }}
                  />
                  <DatePicker
                    label="Check Out Date"
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
                  <Button variant="contained" onClick={handleOpen}>
                    Submit
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </div>
          {adminusername === "admin" && (
            <Link to={`/add-room/${id}`}>
              <Button>Add Room</Button>
            </Link>
          )}
          {/* <Button>Open modal</Button> */}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              {rooms
                .filter((room) => room !== null)
                .slice(0, 3)
                .map((room) => {
                  return (
                    <Box>
                      <form>
                        <Stack direction="column" gap={2}>
                          <Stack direction="row" gap={4}>
                            <Typography variant="h6">
                              Room Type: {room.typeOfRoom}
                            </Typography>
                            <Typography variant="h6">
                              Room Number:{room.roomNumbers[0].number}
                            </Typography>
                          </Stack>
                          <Stack direction="row" gap={4}>
                            <Typography variant="h6">
                              Room Price :{room.price}
                            </Typography>
                            <Typography variant="h6">
                              Max People :{room.maxPeople}
                            </Typography>
                            <Checkbox
                              onChange={(e) =>
                                handleCheckboxChange(
                                  room._id,
                                  room.roomNumbers[0].number,
                                  room.price,
                                  e.target.checked
                                )
                              }
                            />
                          </Stack>
                          <hr></hr>
                        </Stack>
                      </form>
                    </Box>
                  );
                })}
              <Button type="submit" variant="contained" onClick={handleSubmit}>
                Submit
              </Button>
            </Box>
          </Modal>
          {/* <Button onClick={handleHotel}>Check</Button> */}
        </Stack>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default HotelDetail;
