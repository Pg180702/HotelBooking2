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
  Divider,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { UserContext } from "./UserContext";
import { loadStripe } from "@stripe/stripe-js";
import Modal from "@mui/material/Modal";
import UserReviews from "./UserReviews";
import Carousel from "react-material-ui-carousel";
import SearchContext from "./SearchContext";

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
  const adminusername = userInfo.username;
  const username = userInfo.id;
  const handleClose = () => setOpen(false);
  const [hotel, setHotel] = useState({});
  const [rooms, setRooms] = useState([]);
  const [roomsToBook, setRoomsToBook] = useState([]);
  const { searchContext, setSearchContext } = useContext(SearchContext);
  const userid = userInfo.id;
  const handleOpen = () => {
    if (!username) alert("please login first");
    else {
      setRoomsToBook([]);
      handleHotel();
      setOpen(true);
    }
  };
  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/search-item/${id}`
    ).then((response) => {
      response.json().then((hotel) => setHotel(hotel));
    });
  }, []);
  const roomsArray = hotel.rooms;
  const handleHotel = async () => {
    if (!searchContext.checkInDate) alert("Please enter a valid check in date");
    else {
      let stringDate = convertDateToString(searchContext.checkInDate);
      Promise.all(
        roomsArray.map((roomString) =>
          fetch(
            `${
              import.meta.env.VITE_BACKEND_URL
            }/api/v1/users/get-roomdata/${roomString}?date=${stringDate}`
          ).then((response) => response.json())
        )
      ).then((roomsData) => {
        // roomsData is an array of room objects received from fetch requests
        console.log(roomsData);
        const filteredRoomData = roomsData.filter((room) => room !== null);
        setRooms((prevRooms) => [...prevRooms, ...filteredRoomData]);
      });
    }
    //console.log(rooms);
  };
  const handleCheckInDate = (e) => {
    setSearchContext({ ...searchContext, [checkInDate]: e });
  };
  const handleCheckOutDate = (e) => {
    setSearchContext({ ...searchContext, [checkOutDate]: e });
  };
  const convertDateToString = (date) => {
    //this function converts a date to a string
    let value = new Date(date);

    let year = value.getFullYear();
    let month = String(value.getMonth() + 1).padStart(2, "0");
    let day = String(value.getDate()).padStart(2, "0");

    let stringdate = `${year}-${month}-${day}`;

    return stringdate;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const stripe = await loadStripe(
      "pk_test_51Oo4LkSH1zj9aeAXgpk3WSAMW62VpQz6dxbmjbGP4GhRYZDrBi6y5KAQBMoHhdTgqDyvxTxqXjq2msigk0e5qi4q00TYUmLVc9"
    );
    const token = userInfo.token;
    const checkInDate = convertDateToString(searchContext.checkInDate);
    const checkOutDate = convertDateToString(searchContext.checkOutDate);
    const adultCount = searchContext.adultCount;
    const childCount = searchContext.childCount;
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
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/v1/users/create-checkout-session`,
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
    } else {
      setSearchContext({
        destination: "",
        checkInDate: null,
        checkOutDate: null,
        adultCount: null,
        childCount: null,
      });
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
      <Box
        sx={{
          mx: { xs: 2, sm: 5, md: 7, lg: 9, xl: 12 },
          my: { xs: 10, sm: 5, md: 7, lg: 9, xl: 12 },
        }}
      >
        <Stack direction="column" spacing={2}>
          <Typography variant="h4">{hotel.name}</Typography>
          <Carousel>
            {hotel.images.map((item, i) => (
              <img
                src={item}
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                  display: "block",
                  aspectRatio: "14 / 6",
                }}
              />
            ))}
          </Carousel>

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
                    value={searchContext?.checkInDate}
                    onChange={(e) => {
                      handleCheckInDate(e);
                    }}
                  />
                  <DatePicker
                    label="Check Out Date"
                    name="checkOutDate"
                    value={searchContext?.checkOutDate}
                    onChange={(e) => {
                      handleCheckOutDate(e);
                    }}
                  />
                  <TextField
                    label="Adult Count"
                    type="number"
                    defaultValue={1}
                    value={searchContext?.adultCount}
                    onChange={(e) =>
                      setSearchContext({
                        ...searchContext,
                        adultCount: e.target.value,
                      })
                    }
                    InputProps={{ inputProps: { min: 1 } }}
                  />
                  <TextField
                    label="Child Count"
                    type="number"
                    defaultValue={0}
                    value={searchContext?.childCount}
                    onChange={(e) =>
                      setSearchContext({
                        ...searchContext,
                        childCount: e.target.value,
                      })
                    }
                    InputProps={{ inputProps: { min: 0 } }}
                  />
                  <Button
                    variant="contained"
                    onClick={handleOpen}
                    sx={{ backgroundColor: "#284b63" }}
                  >
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
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              {rooms.length > 0 ? (
                <>
                  {rooms
                    .filter((room) => room !== null)
                    .slice(0, 3)
                    .map((room) => (
                      <Box>
                        <form>
                          <Stack direction="column" gap={2}>
                            <Stack direction="row" gap={4}>
                              <Typography variant="h6">
                                Room Type: {room.typeOfRoom}
                              </Typography>
                              <Typography variant="h6">
                                Room Number: {room.roomNumbers[0].number}
                              </Typography>
                            </Stack>
                            <Stack direction="row" gap={4}>
                              <Typography variant="h6">
                                Room Price: {room.price}
                              </Typography>
                              <Typography variant="h6">
                                Max People: {room.maxPeople}
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
                            <hr />
                          </Stack>
                        </form>
                      </Box>
                    ))}
                  <Button
                    type="submit"
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{ backgroundColor: "#284b63" }}
                  >
                    Submit
                  </Button>
                </>
              ) : (
                <Typography
                  variant="h4"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontFamily: "Poppins",
                    fontSize: "2em",
                  }}
                >
                  No rooms available for Selected dates
                </Typography>
              )}
            </Box>
          </Modal>

          {/* <Button onClick={handleHotel}>Check</Button> */}
          <Divider />
          <UserReviews hotelId={id} />
        </Stack>
      </Box>
      {/* <Footer /> */}
    </>
  );
};

export default HotelDetail;
