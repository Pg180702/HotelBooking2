import React from "react";

const SuccessPage = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 100,
      }}
    >
      <div className="card">
        <div
          style={{
            borderRadius: "200px",
            height: "200px",
            width: "200px",
            background: "#F8FAF5",
            margin: "0 auto",
          }}
        >
          <i className="checkmark">✓</i>
        </div>
        <h1>Success</h1>
        <p>
          Yay!! Your Stay Has been Booked
          <br /> You Can view your booking under My Bookings
        </p>
      </div>
    </div>
  );
};

export default SuccessPage;
