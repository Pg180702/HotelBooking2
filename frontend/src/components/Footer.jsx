import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: "#284b63",
        p: 6,
        marginTop: "1rem",
      }}
      component="footer"
    >
      <Typography variant="h6" align="center" gutterBottom>
        Get In Touch With Us!!
      </Typography>
      {/* <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
        component="p"
      >
        Something here to give the footer a purpose!
      </Typography> */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <TextField
          id="outlined-controlled"
          placeholder="Enter Your Email"
          sx={{
            "& input": {
              height: "15px", // Adjust the height as needed
              width: "30vw",
              backgroundColor: "white",
              borderRadius: "5px",
            },
          }}
        />
        <Button variant="contained" sx={{ height: "46px" }}>
          Subscribe
        </Button>
      </div>
    </Box>
  );
};

export default Footer;
