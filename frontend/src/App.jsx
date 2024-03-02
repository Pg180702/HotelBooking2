import "./App.css";
import Home from "./components/Home";
import Layout from "./components/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserContextProvider } from "./components/UserContext";
import Register from "./components/Register";
import Login from "./components/Login";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AddHotel from "./components/AddHotel";
import HotelDetail from "./components/HotelDetail";
import UserAccount from "./components/UserAccount";
import SearchItems from "./components/SearchItems";
import Cancel from "./components/Cancel";
import Success from "./components/Success";
import UserBookings from "./components/UserBookings";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <UserContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/add-hotel" element={<AddHotel />} />
              <Route path="/user-account" element={<UserAccount />} />
              <Route
                path="/search-items/:destination"
                element={<SearchItems />}
              />
              <Route path="/search-item/:id" element={<HotelDetail />} />
              <Route path="/success" element={<Success />} />
              <Route path="/cancel" element={<Cancel />} />
              <Route path="/user-booking" element={<UserBookings />} />
            </Route>
          </Routes>
        </Router>
      </UserContextProvider>
    </LocalizationProvider>
  );
}

export default App;
