const express = require("express");
const user = require("../controllers/user.controller");
const upload = require("../middleware/multer");
const router = express.Router();

router.route("/register").post(user.registerUser);
router.route("/login").post(user.loginUser);
router.route("/add-hotel").post(upload.array("images[]"), user.addHotel);
router.route("/search-items/:destination").get(user.searchHotels);
router.route("/search-item/:id").get(user.searchItem);
router.route("/best-hotels").get(user.bestHotels);
router.route("/cities").get(user.cities);
router.route("/booking/user-id").post(user.booking);
router.route("/create-checkout-session").post(user.stripeSession);

module.exports = router;
