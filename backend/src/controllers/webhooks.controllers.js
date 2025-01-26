const express = require("express");
const Room = require("../models/rooms.models");
const Hotel = require("../models/hotel.models");
const stripe = require("stripe")(process.env.STRIPE_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET_KEY;

const updateBooking = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  console.log("Received signature:", sig);
  console.log("getting stripe event");

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const {
      checkInDate,
      checkOutDate,
      adultCount,
      childCount,
      userId,
      hotelId,
      roomsToBook,
    } = session.metadata;

    try {
      // Process room unavailability
      const parsedRoomsToBook = JSON.parse(roomsToBook);
      await Promise.all(
        parsedRoomsToBook.map(async (room) => {
          const findroom = await Room.findById(room.roomid);
          if (findroom) {
            findroom.roomNumbers[0].unavailability = checkOutDate;
            await findroom.save();
          }
        })
      );

      // Create booking entry
      const hotel = await Hotel.findById(hotelId);
      const roomsBooked = parsedRoomsToBook.map((room) => room.number);
      const finalprice = parsedRoomsToBook.reduce(
        (total, room) => total + room.price,
        0
      );
      const qty = Number(adultCount) + Number(childCount);

      await Booking.create({
        user: userId,
        checkInDate,
        checkOutDate,
        adultCount: Number(adultCount),
        childCount: Number(childCount),
        price: Number(qty * finalprice),
        hotelName: hotel.name,
        roomsBooked: roomsBooked,
        hotelImage: hotel.images[0],
      });

      console.log("Booking successfully created!");
    } catch (err) {
      console.error("Error creating booking:", err.message);
      return res.status(500).send("Internal Server Error");
    }
  }

  res.status(200).send("Webhook received");
};

module.exports = {
  updateBooking,
};
