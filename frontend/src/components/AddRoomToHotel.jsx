import { Box, Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

const AddRoomToHotel = () => {
  const { id } = useParams();
  const [typeOfRoom, setTypeOfRoom] = useState("");
  const [price, setprice] = useState(0);
  const [maxPeople, setmaxPeople] = useState(0);
  const [desc, setdesc] = useState("");
  const [roomNumbers, setroomNumbers] = useState(0);
  const handleSubmit = (e) => {
    e.preventDefault();
    const response = fetch(
      `https://hotelbooking2-9b1p.onrender.com/api/v1/users/add-room/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Specify the Content-Type here
        },
        body: JSON.stringify({
          typeOfRoom,
          price,
          maxPeople,
          desc,
          roomNumbers,
        }),
      }
    );
    // console.log(response);
    if (response.ok) {
      alert("Room Created Successfully");
    }
  };
  return (
    <>
      <Box sx={{ width: "40rem", height: "20rem", margin: "10rem auto" }}>
        <Stack direction="column" spacing={2}>
          <TextField
            variant="outlined"
            label="typeOfRoom"
            fullWidth
            onChange={(e) => setTypeOfRoom(e.target.value)}
          />
          <TextField
            variant="outlined"
            label="price"
            type="number"
            fullWidth
            onChange={(e) => setprice(e.target.value)}
          />
          <TextField
            variant="outlined"
            label="maxPeople"
            type="number"
            onChange={(e) => setmaxPeople(e.target.value)}
            fullWidth
          />
          <TextField
            variant="outlined"
            label="desc"
            fullWidth
            onChange={(e) => setdesc(e.target.value)}
          />
          <TextField
            variant="outlined"
            label="roomNumbers"
            type="number"
            fullWidth
            onChange={(e) => setroomNumbers(e.target.value)}
          />
          <Button variant="contained" type="submit" onClick={handleSubmit}>
            Add Room
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default AddRoomToHotel;
