import React from "react";

const Signal = ({ color = "red", isActive }) => {
  return (
    <div
      className="signal"
      style={{ backgroundColor: isActive ? color : "grey" }}
    ></div>
  );
};

export default Signal;
