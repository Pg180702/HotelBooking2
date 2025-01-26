import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import SearchContext from "./SearchContext";
//import { SearchContext } from "./SearchContext";
const Search = () => {
  const { searchContext, setSearchContext } = useContext(SearchContext);
  const handleInputChange = (eventOrValue, fieldName = null) => {
    if (fieldName) {
      // If a field name is provided (for DatePicker), update state directly
      setSearchContext({ ...searchContext, [fieldName]: eventOrValue });
    } else {
      // Handle TextField events normally
      const { name, value } = eventOrValue.target;
      setSearchContext({ ...searchContext, [name]: value });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/search-hotel`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(searchContext),
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
              padding: "0.6rem", // Adjust padding as needed
              borderRadius: "8px",
              backgroundColor: "#284b63", // Optional: to give rounded corners
            }}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1, sm: 1 }}
            >
              <TextField
                variant="outlined"
                name="destination"
                placeholder="Enter Destination"
                value={searchContext?.destination}
                onChange={handleInputChange}
                sx={{ backgroundColor: "white", border: "2px solid" }}
              />
              <TextField
                variant="outlined"
                name="adultCount"
                value={searchContext?.adultCount}
                placeholder="No Of People"
                onChange={handleInputChange}
                sx={{ backgroundColor: "white", border: "2px solid" }}
              />
              <DatePicker
                onChange={(newValue) =>
                  handleInputChange(newValue, "checkInDate")
                }
                name="checkInDate"
                value={searchContext?.checkInDate}
                slotProps={{
                  textField: {
                    variant: "outlined",
                    placeholder: "Check In Date",
                  },
                }}
                sx={{ backgroundColor: "white", border: "2px solid" }}
              />
              <DatePicker
                onChange={(newValue) =>
                  handleInputChange(newValue, "checkOutDate")
                }
                name="checkOutDate"
                value={searchContext?.checkOutDate}
                slotProps={{
                  textField: {
                    variant: "outlined",
                    placeholder: "Check Out Date",
                  },
                }}
                sx={{ backgroundColor: "white", border: "2px solid" }}
              />
              <Link to={`/search-items/${searchContext.destination}`}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#603140",
                    "&:hover": {
                      backgroundColor: "#603140", // Darker shade for hover
                    },
                  }}
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
