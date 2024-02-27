import React from "react";

const Cities = (props) => {
  return (
    <div
      style={{
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
        maxWidth: "600px",
        margin: "auto 1rem",
        textAlign: "center",
        fontFamily: "arial",
        borderRadius: "0.5rem",
      }}
    >
      <img
        style={{ width: "100%", height: "12em", objectFit: "cover" }}
        src="https://media.istockphoto.com/id/505239248/photo/humayun-tomb-new-delhi-india.jpg?s=612x612&w=0&k=20&c=UQTU6YOnVsSklzHi34cOhNW5AhsACDxKLiD9--T-3Kg="
        alt="Delhi"
      />
    </div>
  );
};

export default Cities;
