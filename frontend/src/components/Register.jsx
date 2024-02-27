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
      "http://localhost:4000/api/v1/users/register",
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
          }}
        >
          <CardContent>
            <Typography variant="h5">Register</Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
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
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                <Grid xs={12} sm={12} item>
                  <Button type="submit" variant="contained" fullWidth>
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
