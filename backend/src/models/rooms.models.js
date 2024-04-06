const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    typeOfRoom: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxPeople: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    roomNumbers: [{ number: Number, unavailability: Date }],
  },
  { timestamps: true }
);

const Room = new mongoose.model("Room", roomSchema);
module.exports = Room;
