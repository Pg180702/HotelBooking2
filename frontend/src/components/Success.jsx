import React from "react";

const Success = () => {
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

        <style jsx>{`
          .card {
            background: #ebf0f5;
            text-align: center;
            padding: 40px 0;
          }
          h1 {
            color: #284b63;
            font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
            font-weight: 900;
            font-size: 40px;
            margin-bottom: 10px;
          }
          p {
            color: #404f5e;
            font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
            font-size: 20px;
            margin: 0;
          }
          i {
            color: #284b63;
            font-size: 100px;
            line-height: 200px;
            margin-left: -15px;
          }
          .card {
            background: white;
            padding: 60px;
            border-radius: 4px;
            box-shadow: 0 2px 3px #c8d0d8;
            display: inline-block;
            margin: 0 auto;
          }
        `}</style>
      </div>
    </div>
  );
};

export default Success;
