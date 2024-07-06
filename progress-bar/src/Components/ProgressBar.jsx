import React, { useEffect, useState } from "react";
import { INTERVAL, MAX_VALUE, MIN_VALUE, STEP } from "../constant";

function ProgressBar() {
  const [bar, setBar] = useState(MIN_VALUE);
  useEffect(() => {
    const interval = setInterval(() => {
      setBar((prev) => {
        if (prev === MAX_VALUE) {
          clearInterval(interval);
        //   return 100;
        }
        // return prev + (0.1);
        return Math.min(prev + STEP, MAX_VALUE);
      });
    }, INTERVAL);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="container">
      <div
        className="progress"
        style={{
          transform: `translateX(${bar - 100}%)`,
        }}
      ></div>
    </div>
  );
}

export default ProgressBar;
