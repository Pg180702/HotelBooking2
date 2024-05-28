import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
//import { SearchContext } from "./SearchContext";
const Search = () => {
  const [formData, setFormData] = useState({
    checkInDate: "",
    checkOutDate: "",
    destination: "",
    people: "",
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://hotelbooking2-9b1p.onrender.com/api/v1/users/search-hotel",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    );
    if (response.ok) {
      const responseData = await response.json();
      if (responseData) {
        setRedirect(true);
        console.log(responseData.hotels);
        setHotels(responseData.hotels);
        //setDestination(destination);
      }
      alert("Seach Success");
    } else alert("Seach Failure");
  };
  return (
    <>
      <Typography
        variant="h2"
        sx={{
          marginLeft: { sm: "3.6rem" },
          display: { xs: "flex", sm: "block" },
          justifyContent: { xs: "center" },
          fontWeight: "bold",
          fontSize: "1.5em",
          marginBottom: "1rem",
          fontFamily: "Poppins",
        }}
      >
        Book Your Next Stay
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "4rem",
          }}
        >
          <Box
            sx={{
              border: "2px solid #284b63",
              padding: "1rem", // Adjust padding as needed
              borderRadius: "8px", // Optional: to give rounded corners
            }}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1, sm: 1 }}
            >
              <TextField
                variant="outlined"
                name="destination"
                label="Enter Destination"
                value={formData.destination}
                onChange={handleInputChange}
              />
              <TextField
                variant="outlined"
                label="Enter People"
                name="people"
                value={formData.people}
                onChange={handleInputChange}
              />
              <DatePicker
                label="Check In Date"
                onChange={handleInputChange}
                name="checkInDate"
              />
              <DatePicker
                label="Check Out Date"
                onChange={handleInputChange}
                name="checkOutDate"
              />
              <Link to={`/search-items/${formData.destination}`}>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#284b63" }}
                  type="submit"
                  fullWidth
                  style={{ height: "100%" }}
                >
                  Search
                </Button>
              </Link>
            </Stack>
          </Box>
        </Box>
      </form>
    </>
  );
};

export default Search;
