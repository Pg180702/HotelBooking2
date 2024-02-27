const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: {
    // type:mongoose.Schema.Types.ObjectId,
    // ref:"User",
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  checkInDate: {
    type: String,
    required: true,
  },
  checkOutDate: {
    type: String,
    required: true,
  },
  childCount: {
    type: Number,
    required: true,
  },
  adultCount: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  hotelName: {
    type: String,
    required: true,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
