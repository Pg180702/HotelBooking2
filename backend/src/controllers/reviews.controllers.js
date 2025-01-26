const mongoose = require("mongoose");
const ApiError = require("../utils/ApiError");
const Hotel = require("../models/hotel.models");
const Review = require("../models/reviews.models");

const fetchPaginatedReviews = async (req, res) => {
  const pageIndex = parseInt(req.query.pageIndex);
  const pageSize = parseInt(req.query.pageSize);
  const hotelId = req.query.hotelId;
  const startIndex = (pageIndex - 1) * pageSize;
  const endIndex = pageIndex * pageSize;

  try {
    //populate here simplifies joins instead of making db call for each user it
    //makes an internal call using user id and gets the required results here
    const hotel = await Hotel.findById(hotelId).populate({
      path: "reviews",
      populate: {
        path: "user", // Populate the `user` field in each review
        select: "firstName lastName", // Include only `firstName` and `lastName`
      },
    });

    if (!hotel) {
      return res.status(404).json({ error: "Hotel not found" });
    }

    const stats = {
      totalReviews: hotel.reviews.length,
      overallRating: 0,
      ratingsDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    };

    let totalRatingSum = 0;

    // Calculate stats
    hotel.reviews.forEach((review) => {
      const rating = review.rating;
      stats.ratingsDistribution[rating] =
        (stats.ratingsDistribution[rating] || 0) + 1;
      totalRatingSum += parseInt(rating);
    });
    // Calculate overall rating and percentages
    stats.overallRating =
      stats.totalReviews > 0
        ? (totalRatingSum / stats.totalReviews).toFixed(1)
        : 0;

    for (let key in stats.ratingsDistribution) {
      stats.ratingsDistribution[key] =
        stats.totalReviews > 0
          ? (
              (stats.ratingsDistribution[key] / stats.totalReviews) *
              100
            ).toFixed(1)
          : 0;
    }

    const sortedReviews = hotel.reviews.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    const paginatedReviews = sortedReviews.slice(startIndex, endIndex);
    const totalPages = Math.ceil(hotel.reviews.length / pageSize);

    res.status(200).json({ reviews: paginatedReviews, totalPages, stats });
  } catch {
    throw new ApiError(404, "Failed in fetching reviews");
  }
};

const addReview = async (req, res) => {
  const review = req.body;
  try {
    const result = await Review.create({
      user: review.username,
      hotelId: review.hotelId,
      reviewText: review.description,
      rating: review.rating,
    });
    const hotel = await Hotel.findById(review.hotelId);
    hotel.reviews.push(result);
    await hotel.save();
    return res.status(200).json(result);
  } catch (error) {
    throw new ApiError(404, "Failed in adding review");
  }
};

module.exports = {
  fetchPaginatedReviews,
  addReview,
};
