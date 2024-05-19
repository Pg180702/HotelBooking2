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
      <h2
        style={{ sm: { marginLeft: "4.5rem" }, xs: { marginLeft: "3.8rem" } }}
      >
        Book Your next stay
      </h2>
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
              sx={{ border: "2px solid #284b63" }}
            />
            <TextField
              variant="outlined"
              label="Enter  people"
              name="people"
              value={formData.people}
              sx={{ border: "2px solid #284b63" }}
              onChange={handleInputChange}
            />
            <DatePicker
              label="Basic date picker"
              onChange={handleInputChange}
              sx={{ border: "2px solid #284b63" }}
              name="checkInDate"
            />
            <DatePicker
              label="Basic date picker"
              onChange={handleInputChange}
              sx={{ border: "2px solid #284b63" }}
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
