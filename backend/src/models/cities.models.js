const mongoose = require("mongoose");

const citiesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: 0,
  },
  count: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    required: true,
  },
});

const City = new mongoose.model("City", citiesSchema);
module.exports = City;
