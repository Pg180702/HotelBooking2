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
  const { token } = await generateAccessToken(user._id);
  const createdUser = await User.findById(user._id).select("-password");
  if (!createdUser) {
    throw new ApiError(500, "Cannot Register User");
  }
  const options = { httpOnly: true, secure: true };
  return res.status(200).cookie("token", token, options).json(createdUser);
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
  // console.log(req.body);
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
  const { checkInDate, checkOutDate, adultCount, childCount, id, userid } =
    req.body;
  const hotelid = new mongoose.Types.ObjectId(id);
  const userBookingId = new mongoose.Types.ObjectId(userid);
  const hotelprice = await Hotel.findById(hotelid);
  const price = hotelprice.pricePerNight;
  const qty = Number(adultCount) + Number(childCount);
  console.log(price);
  const data = {
    price_data: {
      currency: "inr",
      product_data: {
        name: hotelprice.name,
      },
      unit_amount: price * 100,
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
    price: Number(qty * price),
    hotelName: hotelprice.name,
  });
  res.status(200).json({ id: session.id });
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
};
