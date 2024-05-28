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
      <div
        className="card"
        style={{
          backgroundColor: "white",
          padding: "60px",
          borderRadius: "4px",
          width: "30rem",
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
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <i
            className="checkmark"
            style={{
              color: "#284b63",
              fontSize: "100px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            x
          </i>
        </div>
        <h1
          style={{
            color: "#284b63",
            display: "flex",
            justifyContent: "center",
          }}
        >
          Cancel
        </h1>
        <p style={{ display: "flex", justifyContent: "center" }}>
          Oh No!! Booking Failed
        </p>
        <span style={{ display: "flex", justifyContent: "center" }}>
          Kindly Retry Again
        </span>
      </div>
    </div>
  );
};

export default CancelPage;
