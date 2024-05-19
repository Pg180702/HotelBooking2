import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Button,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { setUserInfo, userInfo } = useContext(UserContext);
  //const [username, setUsername] = useState("");
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const username = sessionStorage.getItem("userid");
  const adminusername = sessionStorage.getItem("username");
  console.log(adminusername);
  const handleClose = () => {
    setAnchorEl(null);
  };
  //fix the logout error
  const handleLogout = () => {
    sessionStorage.removeItem("userid");
    // fetch("http://localhost:4000/api/v1/users/logout").then((response) => {
    //   response.json().then((r) => console.log(r));
    // });
    window.location.href = "/";
  };
  // const username = userInfo?.email;

  //console.log(userInfo.id);
  console.log(username);
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar sx={{ backgroundColor: "#284b63" }}>
          <Toolbar>
            <Typography component="div" variant="h6" sx={{ flexGrow: 1 }}>
              <Link to={"/"} style={{ textDecoration: "none" }}>
                <span
                  style={{
                    color: "white",
                    textDecoration: "none",
                  }}
                >
                  HotelMern
                </span>
              </Link>
            </Typography>
            {!username && (
              <>
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <Button
                    sx={{
                      color: "white",
                      display: { xs: "none", sm: "block" },
                    }}
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/register" style={{ textDecoration: "none" }}>
                  <Button
                    sx={{
                      color: "white",
                      display: { xs: "none", sm: "block" },
                    }}
                  >
                    Register
                  </Button>
                </Link>
                <Button
                  id="demo-positioned-button"
                  aria-controls={open ? "demo-positioned-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  sx={{ display: { xs: "block", sm: "none" } }}
                >
                  <MenuIcon />
                </Button>
                <Menu
                  id="demo-positioned-menu"
                  aria-labelledby="demo-positioned-button"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                >
                  <MenuItem onClick={handleClose}>
                    <Link to={"/login"} style={{ textDecoration: "none" }}>
                      Login
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link to={"/register"} style={{ textDecoration: "none" }}>
                      Register
                    </Link>
                  </MenuItem>
                  {/* <MenuItem onClick={handleClose}>Logout</MenuItem> */}
                </Menu>
              </>
            )}
            {username && (
              <>
                <Button
                  sx={{
                    color: "white",
                    display: { xs: "none", sm: "block" },
                  }}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
                <Link to="/user-booking" style={{ textDecoration: "none" }}>
                  <Button
                    sx={{
                      color: "white",
                      display: { xs: "none", sm: "block" },
                    }}
                  >
                    My Bookings
                  </Button>
                </Link>
                {adminusername === "admin" && (
                  <Link to="/add-hotel" style={{ textDecoration: "none" }}>
                    <Button
                      sx={{
                        color: "white",
                        display: { xs: "none", sm: "block" },
                      }}
                    >
                      Add Hotel
                    </Button>
                  </Link>
                )}
                <Button
                  id="demo-positioned-button"
                  aria-controls={open ? "demo-positioned-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  sx={{ display: { xs: "block", sm: "none" } }}
                >
                  <MenuIcon />
                </Button>
                <Menu
                  id="demo-positioned-menu"
                  aria-labelledby="demo-positioned-button"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                >
                  <MenuItem onClick={handleClose}>
                    <Link
                      to={"/user-booking"}
                      style={{ textDecoration: "none" }}
                    >
                      My Bookings
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            )}
          </Toolbar>
        </AppBar>
      </Box>

      {/*footer */}
    </>
  );
};

export default Header;
