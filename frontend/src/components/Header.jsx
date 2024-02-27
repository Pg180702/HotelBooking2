import React, { useContext } from "react";
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
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const username = userInfo?.email;
  //console.log(userInfo.id);
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar sx={{ backgroundColor: "#284b63" }}>
          <Toolbar>
            <Typography component="div" variant="h6" sx={{ flexGrow: 1 }}>
              <Link to={"/"}>
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
                <Link to="/login">
                  <Button
                    sx={{
                      color: "white",
                      display: { xs: "none", sm: "block" },
                    }}
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/register">
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
                  <MenuItem onClick={handleClose}>Login</MenuItem>
                  <MenuItem onClick={handleClose}>Register</MenuItem>
                  <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Menu>
              </>
            )}
            {username && (
              <>
                <Link to="/logout">
                  <Button
                    sx={{
                      color: "white",
                      display: { xs: "none", sm: "block" },
                    }}
                  >
                    Logout
                  </Button>
                </Link>
                <Link to="/hotels">
                  <Button
                    sx={{
                      color: "white",
                      display: { xs: "none", sm: "block" },
                    }}
                  >
                    Hotels
                  </Button>
                </Link>
                <Link to="/add-hotel">
                  <Button
                    sx={{
                      color: "white",
                      display: { xs: "none", sm: "block" },
                    }}
                  >
                    Add Hotel
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
                  <MenuItem onClick={handleClose}>Hotels</MenuItem>
                  <MenuItem onClick={handleClose}>Logout</MenuItem>
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
