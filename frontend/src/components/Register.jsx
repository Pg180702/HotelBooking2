import React, { useState } from "react";
import {
  Stack,
  TextField,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

const Register = () => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://hotelbooking2-9b1p.onrender.com/api/v1/users/register",
      {
        method: "POST",
        body: JSON.stringify({ firstName, lastName, email, password }),
        headers: { "Content-Type": "application/json" },
      }
    );
    if (response.status === 200) alert("Registration success");
    else alert("registration failed");
  };
  return (
    <div>
      <Grid>
        <Card
          sx={{
            maxWidth: 800,
            padding: "20px 5px",
            margin: "140px auto auto auto",
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          }}
        >
          <CardContent>
            <Typography variant="h5">Register</Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2} sx={{ padding: "1rem" }}>
                <Grid xs={12} sm={12} item>
                  <TextField
                    placeholder="Enter First Name"
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setfirstName(e.target.value)}
                  />
                </Grid>
                <Grid xs={12} sm={12} item>
                  <TextField
                    placeholder="Enter Last Name"
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setlastName(e.target.value)}
                  />
                </Grid>
                <Grid xs={12} sm={12} item>
                  <TextField
                    placeholder="Enter Email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid xs={12} sm={12} item>
                  <TextField
                    placeholder="Enter Password"
                    label="Password"
                    variant="outlined"
                    fullWidth
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                <Grid xs={12} sm={12} item>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{ backgroundColor: "#284b63" }}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};

export default Register;
