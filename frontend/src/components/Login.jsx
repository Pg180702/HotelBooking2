import React, { useContext, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://hotelbooking2-9b1p.onrender.com/api/v1/users/login",
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );
    //console.log(response);
    if (response.ok) {
      response.json().then((userInfo) => {
        console.log(userInfo);
        sessionStorage.setItem("userid", userInfo.id);
        sessionStorage.setItem("username", userInfo.firstName);
        sessionStorage.setItem("token", userInfo.token);
        setUserInfo(userInfo);
        setRedirect(true);
      });
    } else alert("Wrong Credentials");
  };
  if (redirect) {
    return <Navigate to={"/"} />;
  }
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
            <Typography variant="h5">Login</Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2} sx={{ padding: "1rem" }}>
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

export default Login;
