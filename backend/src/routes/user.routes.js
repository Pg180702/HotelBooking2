const express = require("express");
const user = require("../controllers/user.controller");
const upload = require("../middleware/multer");
const router = express.Router();
const authToken = require("../middleware/auth");

router.route("/register").post(user.registerUser);
router.route("/login").post(user.loginUser);
router.route("/add-hotel").post(upload.array("images[]"), user.addHotel);
router.route("/search-items/:destination").get(user.searchHotels);
router.route("/search-item/:id").get(user.searchItem);
router.route("/best-hotels").get(user.bestHotels);
router.route("/cities").get(user.cities);
router.route("/booking/user-id").post(user.booking);
router.route("/create-checkout-session").post(user.stripeSession);
router.route("/my-bookings/:id").get(user.myBookings);
router.route("/add-room/:id").post(user.addRooms);
router.route("/get-roomdata/:id").get(user.getRoomData);
router.route("/update-room/:id").post(user.updateRoom);

module.exports = router;
