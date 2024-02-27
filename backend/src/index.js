require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

app.use(cookieParser());
app.post("/test", async (req, res) => {
  console.log(req.body);
});
const userRoutes = require("./routes/user.routes");

mongoose
  .connect(`${process.env.MONGODB_URI}`)
  .then(() => console.log("Mongo Connected!!"))
  .catch((err) => console.log(err));
app.use("/api/v1/users", userRoutes);
app.listen(4000, () => console.log("server listening on port 4000"));
