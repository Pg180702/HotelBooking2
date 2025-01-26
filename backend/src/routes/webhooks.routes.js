const express = require("express");
const router = express.Router();
const webhooks = require("../controllers/webhooks.controllers");

router
  .route("/stripeWebhook")
  .post(express.raw({ type: "application/json" }), webhooks.updateBooking);

module.exports = router;
