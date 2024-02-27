import { Box, Button, Stack, TextField } from "@mui/material";
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
      "http://localhost:4000/api/v1/users/search-hotel",
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
      <h2 style={{ marginLeft: "16rem" }}>Book Your next stay</h2>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "4rem",
          }}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 1 }}
          >
            <TextField
              variant="outlined"
              label="Enter Destination"
              name="destination"
              value={formData.destination}
              onChange={handleInputChange}
            />
            <TextField
              variant="outlined"
              label="Enter  people"
              name="people"
              value={formData.people}
              onChange={handleInputChange}
            />
            <DatePicker
              label="Basic date picker"
              onChange={handleInputChange}
              name="checkInDate"
            />
            <DatePicker
              label="Basic date picker"
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
      </form>
    </>
  );
};

export default Search;
