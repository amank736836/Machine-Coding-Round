import React, { useState } from "react";

function StarRating({ starCount = 5 }) {
  const [starValue, setStarValue] = useState(undefined);
  console.log(starValue);
  const [hoverValue, setHoverValue] = useState(undefined);
  console.log(hoverValue);
  return (
    <div className="container">
      {new Array(starCount).fill(0).map((_, index) => {
        return (
          <span
            key={index}
            className={
              // (hoverValue === undefined && index <= starValue) ||
              // index <= hoverValue
              //   ? "gold"
              //   : ""
              index < (hoverValue || starValue) ? "gold" : ""
            }
            onMouseEnter={() => {
              setHoverValue(index+1);
            }}
            onMouseLeave={() => {
              setHoverValue(undefined);
            }}
            onClick={() => {
              setStarValue(index+1);
            }}
          >
            &#9733;
          </span>
        );
      })}
    </div>
  );
}

export default StarRating;
