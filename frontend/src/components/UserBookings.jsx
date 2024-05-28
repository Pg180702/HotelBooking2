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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const id = sessionStorage.getItem("userid");

  useEffect(() => {
    fetch(
      `https://hotelbooking2-9b1p.onrender.com/api/v1/users/my-bookings/${id}`
    )
      .then((response) => response.json())
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Typography
        variant="h4"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "Poppins",
          color: "black",
        }}
      >
        Loading...
      </Typography>
    );
  }

  if (error) {
    return (
      <Typography
        variant="h4"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "Poppins",
          color: "black",
        }}
      >
        Error loading bookings
      </Typography>
    );
  }

  return (
    <>
      {bookings.length === 0 ? (
        <Typography
          variant="h4"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "Poppins",
            color: "black",
          }}
        >
          No Bookings Yet
        </Typography>
      ) : (
        <Container
          maxWidth="lg"
          sx={{
            marginTop: "100px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {bookings.map((booking) => (
            <Card
              key={booking.id} // Add a unique key for each mapped element
              sx={{
                padding: "2rem",
                display: "flex",
                justifyContent: "flex-start",
                gap: "2rem",
                marginTop: "20px",
                flexDirection: { sm: "row", xs: "column" },
                width: { sm: 800 },
              }}
            >
              <CardMedia
                component="img"
                sx={{ width: { sm: 250, xs: "100%" } }}
                image={booking.hotelImage}
                alt="Live from space album cover"
              />
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
              >
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    {booking.hotelName}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    Adults: {booking.adultCount} <span> </span> Children:{" "}
                    {booking.childCount}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    Check In Date: {booking.checkInDate}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    Check Out Date: {booking.checkOutDate}
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
          ))}
        </Container>
      )}
    </>
  );
};

export default UserBookings;
