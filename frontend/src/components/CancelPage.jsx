import React from "react";

const CancelPage = () => {
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
          <span className="cross" style={{ color: "red", fontSize: "24px" }}>
            ✕
          </span>
        </div>
        <h1>Failed</h1>
        <p>
          Yay!! Your Stay Has been Booked
          <br /> You Can view your booking under My Bookings
        </p>
      </div>
    </div>
  );
};

export default CancelPage;
