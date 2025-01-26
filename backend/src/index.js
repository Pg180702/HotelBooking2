require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const stripe = require("stripe")(process.env.STRIPE_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET_KEY;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    origin: `${process.env.FRONTEND_URL}`,
  })
);

app.use(cookieParser());

const userRoutes = require("./routes/user.routes");
const reviewRoutes = require("./routes/reviews.routes");
const webhookRoutes = require("./routes/webhooks.routes");
mongoose
  .connect(`${process.env.MONGODB_URI}`)
  .then(() => console.log("Mongo Connected!!"))
  .catch((err) => console.log(err));
app.use("/api/v1/webhooks", webhookRoutes);

app.use(express.json());
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/reviews", reviewRoutes);
app.listen(4000, () => console.log("server listening on port 4000"));
