import React from "react";
import "../App.css";
const SuccessPage = () => {
  return (
    <body>
      <div class="card">
        <div style="border-radius:200px; height:200px; width:200px; background: #F8FAF5; margin:0 auto;">
          <i class="checkmark">✓</i>
        </div>
        <h1>Success</h1>
        <p>
          Your Hotel Has Been Booked
          <br /> Kindly Check Your Booking Under My Bookings
        </p>
      </div>
    </body>
  );
};

export default SuccessPage;
