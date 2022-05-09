import React from "react";
import "./Card.css";

const Card = ({ children, width, margin }) => {
  return (
    <div className="card" style={{ width: width, margin: margin }}>
      {children}
    </div>
  );
};

export default Card;
