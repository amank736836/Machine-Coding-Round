import React, { useEffect, useRef, useState } from "react";
import data from "./data.json";

function ImageCarousel() {
  const [index, setIndex] = useState(0);
  const intervalId = useRef(null);

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? data.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIndex((prev) => (prev === data.length - 1 ? 0 : prev + 1));
  };

  //   const interval = () => {
  //     const intervalId = setInterval(() => {
  //         handleNext();
  //     }, 2000);
  // };

  // interval();

  //   const change = () => {
  //       setTimeout(() => {
  //           handleNext();
  //       }, 1000);
  //   }

  //   change();

  useEffect(() => {
    intervalId.current = setInterval(() => {
      handleNext();
    }, 2000);

    return () => {
      clearInterval(intervalId.current);
    };
  }, []);

  //   console.log(data);

  return (
    <div onMouseEnter={() => clearInterval(intervalId.current)} 
    onMouseLeave={()=>{
        intervalId.current = setInterval(() => {
            handleNext();
          }, 2000);
    }} className="container">
      <div className="left-btn" onClick={handlePrev}>
        {"<"}
      </div>
      <img
        src={data[index].download_url}
        alt="carousel"
        className="carousel-img"
      />
      <div onClick={handleNext} className="right-btn">
        {">"}
      </div>
    </div>
  );
}

export default ImageCarousel;
