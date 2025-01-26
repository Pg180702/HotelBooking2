const express = require("express");
const reviews = require("../controllers/reviews.controllers");

const router = express.Router();

router.route("/fetchReviews").get(reviews.fetchPaginatedReviews);
router.route("/addReview").post(reviews.addReview);

module.exports = router;
