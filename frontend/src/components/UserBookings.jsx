import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Footer from "./Footer";

const UserBookings = () => {
  function RoomList({ roomsBooked }) {
    return (
      <div>
        <Typography variant="subtitle1" color="text.secondary" component="div">
          Rooms Booked:
        </Typography>
        <ul>
          {roomsBooked.map((roomNumber, index) => (
            <li key={index}>{roomNumber}</li>
          ))}
        </ul>
      </div>
    );
  }
  const [bookings, setBookings] = useState([]);
  const id = sessionStorage.getItem("userid");
  console.log(id);
  useEffect(() => {
    fetch(`http://localhost:4000/api/v1/users/my-bookings/${id}`).then(
      (response) => {
        response.json().then((data) => setBookings(data));
      }
    );
    console.log(bookings);
  }, []);
  if (bookings.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          marginTop: "100px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {bookings.map((booking) => {
          return (
            <Card
              sx={{
                padding: "2rem",
                display: "flex",
                justifyContent: "flex-start",
                // alignItems: "center",
                gap: "2rem",
                marginTop: "20px",
                flexDirection: { sm: "row", xs: "column" },
                width: { sm: 800 },
              }}
            >
              <CardMedia
                component="img"
                sx={{ width: { sm: 250, xs: "100%" } }}
                image="https://media.istockphoto.com/id/119926339/photo/resort-swimming-pool.jpg?s=612x612&w=0&k=20&c=9QtwJC2boq3GFHaeDsKytF4-CavYKQuy1jBD2IRfYKc="
                alt="Live from space album cover"
              />
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
              >
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    Hotel: {booking.hotelName}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    Adults: {booking.adultCount} Children: {booking.childCount}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    Check In Date: {booking.checkInDate} Check Out Date:
                    {booking.checkOutDate}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    Price: {booking.price}
                  </Typography>
                  <div>
                    <RoomList roomsBooked={booking.roomsBooked} />
                  </div>
                </CardContent>
              </Box>
            </Card>
          );
        })}
      </Container>
      {/* <Footer /> */}
    </>
  );
};

export default UserBookings;
