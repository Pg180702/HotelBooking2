require("dotenv").config();
const mongoose = require("mongoose");
const ApiError = require("../utils/ApiError");
const User = require("../models/user.models");
const jwt = require("jsonwebtoken");
const upload = require("../middleware/multer");
const uploadOnCloudinary = require("../utils/cloudinary");
const Hotel = require("../models/hotel.models");
const City = require("../models/cities.models");
const Booking = require("../models/bookings.models");
const Room = require("../models/rooms.models");
const stripe = require("stripe")(process.env.STRIPE_KEY);

const generateAccessToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const token = user.generateToken;
    return { token };
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating tokens");
  }
};
const registerUser = async (req, res) => {
  const { firstName, lastName, password, email } = req.body;
  if (
    [firstName, lastName, password, email].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All Fiellds Required");
  }
  const existedUser = await User.findOne({ email });
  if (existedUser) {
    throw new ApiError(409, "user already exists");
  }
  const user = await User.create({
    firstName,
    lastName,
    password,
    email,
  });
  // const { token } = await generateAccessToken(user._id);
  const createdUser = await User.findById(user._id).select("-password");
  if (!createdUser) {
    throw new ApiError(500, "Cannot Register User");
  }
  const options = { httpOnly: true, secure: true };
  return res.status(200).json(createdUser);
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if ([email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All Fields Are Required");
  }
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new ApiError(404, "User does not exist");
  }
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "User Credentials invalid");
  }
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
  const options = { httpOnly: true, secure: true };
  //console.log(token);
  return res
    .status(200)
    .cookie("auth_token", token, options)
    .json({ id: user._id, email });
};
const addHotel = async (req, res) => {
  const {
    name,
    city,
    country,
    description,
    type,
    pricePerNight,
    adultCount,
    childCount,
    facilities,
  } = req.body;
  console.log(req.body);
  //console.log(req.files);
  if (
    !name ||
    !city ||
    !country ||
    !description ||
    !type ||
    !pricePerNight ||
    !adultCount ||
    !childCount ||
    !facilities
  ) {
    throw new ApiError(400, "All Fields Required");
  }
  const imagePaths = req.files;
  const imageUploads = await Promise.all(
    req.files.map((file) => uploadOnCloudinary(file.path))
  );
  if (!imageUploads) throw new ApiError(400, "Failed to Upload To Cloudinary");
  //console.log(imageUploads);
  const hotel = await Hotel.create({
    name,
    city,
    country,
    description,
    type,
    pricePerNight,
    adultCount,
    childCount,
    facilities,
    images: imageUploads.map((image) => image.url),
  });
  const cities = City.findOneAndUpdate(
    { name: city, country: country },
    { $inc: { count: 1 } },
    { upsert: true }
  );
  res.status(200).json(hotel);
};
const searchHotels = async (req, res) => {
  const { destination } = req.params;
  //console.log(destination);
  if (!destination) {
    throw new ApiError(400, "All Fields Required");
  }
  const hotels = await Hotel.find({ city: destination });
  //console.log(hotels);
  return res.status(200).json(hotels);
};
const searchItem = async (req, res) => {
  const { id } = req.params;
  const hotel = await Hotel.findById(id);
  //console.log(hotel);
  return res.status(200).json(hotel);
};
const bestHotels = async (req, res) => {
  const hotels = await Hotel.find();
  const limited = hotels.slice(1, 7);
  //console.log(limited);
  return res.status(200).json(limited);
};
const cities = async (req, res) => {
  const cities = await City.find();
  //const limited=hotels.slice(0,11);
  return res.status(200).json(cities);
};
const booking = async (req, res) => {
  const { userid, adultCount, checkInDate, checkOutDate, childCount } =
    req.body;
  if (!checkInDate || !checkOutDate || !adultCount || !childCount)
    throw new ApiError(400, "All Fields Required");
  const objectid = new mongoose.Types.ObjectId(userid);

  res.status(200).json(bookings);
};
const stripeSession = async (req, res) => {
  const {
    checkInDate,
    checkOutDate,
    adultCount,
    childCount,
    id,
    userid,
    roomsToBook,
  } = req.body;
  console.log(req.body);
  // let finalprice = 0;
  const hotelid = new mongoose.Types.ObjectId(id);
  const userBookingId = new mongoose.Types.ObjectId(userid);
  const hotelprice = await Hotel.findById(hotelid);
  const finalprice = roomsToBook.reduce((total, room) => total + room.price, 0);
  console.log(finalprice);
  const finalprice2 = finalprice * 100;
  const qty = Number(adultCount) + Number(childCount);
  // console.log(price);
  const data = {
    price_data: {
      currency: "inr",
      product_data: {
        name: hotelprice.name,
      },
      unit_amount: finalprice2,
    },
    quantity: qty,
  };
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [data],
    metadata: {
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      adultCount: adultCount,
      childCount: childCount,
    },
    mode: "payment",
    success_url: "http://localhost:5173/success",
    cancel_url: "http://localhost:5173/cancel",
  });
  //console.log(data);
  const booking = await Booking.create({
    user: userBookingId,
    checkInDate,
    checkOutDate,
    adultCount: Number(adultCount),
    childCount: Number(childCount),
    price: Number(qty * finalprice),
    hotelName: hotelprice.name,
  });
  res.status(200).json({ id: session.id });
};
const myBookings = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const bookings = await Booking.find({ user: id });
  console.log(bookings);
  res.status(200).json(bookings);
};
const logout = async (req, res) => {
  const options = {
    httpOnly: true,
    secure: true,
  };
  res.status(200).clearCookie("auth_token", options).json("Logout Success");
};
const addRooms = async (req, res) => {
  const { typeOfRoom, price, maxPeople, desc, roomNumbers } = req.body;
  console.log(req.body);
  const id = req.params.id; // Assuming the hotel ID is passed in the request params
  const hotel = await Hotel.findById(id);

  try {
    // Create a new Room instance
    const room = await Room.create({
      typeOfRoom,
      price: Number(price),
      maxPeople: Number(maxPeople),
      desc,
      roomNumbers: [{ number: Number(roomNumbers), unavailability: "" }], // Pushing a single room number object
    });

    // Save the new room to the database
    // const savedRoom = await room.save();

    // Update the hotel with the new room
    const addToHotel = await Hotel.findByIdAndUpdate(id, {
      $push: { rooms: room._id },
    });

    res.status(200).json("Room created");
  } catch (error) {
    // Handle any errors that occur during room creation or hotel update
    console.error(error);
    res.status(500).json({ error: "Failed to create room" });
  }
};
const getRoomData = async (req, res) => {
  const { id } = req.params;
  const { date } = req.query;
  console.log(date);
  const room = await Room.findById(id);
  // console.log(room);
  //console.log(new Date(date));
  if (room && new Date(room.roomNumbers[0].unavailability) < new Date(date))
    res.status(200).json(room);
  else res.json(null);
};
const updateRoom = async (req, res) => {
  const { id } = req.params;
  const { date } = req.body;
  const finaldate = new Date(date.substring(0, 10));
  console.log(finaldate);
  const room = await Room.findByIdAndUpdate(
    id,
    { $set: { "roomNumbers.$[].unavailability": finaldate } },
    { new: true }
  );
  return res.status(200).json(room);
};
module.exports = {
  registerUser,
  loginUser,
  addHotel,
  searchHotels,
  searchItem,
  bestHotels,
  cities,
  booking,
  stripeSession,
  myBookings,
  addRooms,
  getRoomData,
  updateRoom,
};
