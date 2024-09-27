import React, { useDebugValue, useEffect, useState } from "react";
import Signal from "./Signal";

const Traffic = ({ lights = ["green", "yellow", "red"] }) => {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((active) => (active + 1) % lights.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [active]);
  return (
    <>
      {lights.map((color, index) => {
        return <Signal key={index} color={color} isActive={active === index} />;
      })}
    </>
  );
};

export default Traffic;
