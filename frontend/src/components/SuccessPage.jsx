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
      <div
        className="card"
        style={{
          backgroundColor: "white",
          padding: "60px",
          borderRadius: "4px",
          boxShadow: "0 2px 3px #C8D0D8",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            borderRadius: "200px",
            height: "200px",
            width: "200px",
            background: "#F8FAF5",
            margin: "0 auto",
          }}
        >
          <i
            className="checkmark"
            style={{
              color: "#284b63",
              fontSize: "100px",
              lineHeight: "200px",
              marginLeft: "-20px",
            }}
          >
            ✓
          </i>
        </div>
        <h1 style={{ color: "#284b63" }}>Success</h1>
        <p>
          Yay!! Your Stay Has been Booked
          <br /> You Can view your booking under My Bookings
        </p>
      </div>
    </div>
  );
};

export default SuccessPage;
