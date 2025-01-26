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
import UserBookings from "./components/UserBookings";
import AddRoomToHotel from "./components/AddRoomToHotel";
import SuccessPage from "./components/SuccessPage";
import CancelPage from "./components/CancelPage";
import { SearchContextProvider } from "./components/SearchContext";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <SearchContextProvider>
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
                <Route path="/success-page" element={<SuccessPage />} />
                <Route path="/cancel-page" element={<CancelPage />} />
                <Route path="/user-booking" element={<UserBookings />} />
                <Route path="/add-room/:id" element={<AddRoomToHotel />} />
              </Route>
            </Routes>
          </Router>
        </UserContextProvider>
      </SearchContextProvider>
    </LocalizationProvider>
  );
}

export default App;
