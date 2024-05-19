import React from "react";
import { Link } from "react-router-dom";

const Cities = (props) => {
  const { city } = props;
  return (
    <div
      style={{
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
        maxWidth: "600px",
        margin: "auto 0.5rem",
        textAlign: "center",
        fontFamily: "arial",
        borderRadius: "1rem",
        position: "relative",
      }}
    >
      <Link to={`/search-items/${city.name}`}>
        <img
          style={{
            width: "100%",
            height: "12em",
            objectFit: "cover",
            borderRadius: "1rem",
          }}
          src={city.data}
          alt="Delhi"
        />
      </Link>
      <div style={{ position: "absolute", top: "1rem", left: "1rem" }}>
        {city.name.charAt(0).toUpperCase() + city.name.slice(1)}
      </div>
    </div>
  );
};

export default Cities;
