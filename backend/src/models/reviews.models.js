const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
    },
    reviewText: {
      type: String,
      required: true,
    },
    rating: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
//todo sort functionality based on ratings
const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
