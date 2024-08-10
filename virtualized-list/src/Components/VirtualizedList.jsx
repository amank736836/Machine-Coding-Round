import React, { useState } from "react";

const VirtualizedList = ({ list, height, itemHeight, width }) => {
  const [indices, setIndices] = useState([0, Math.floor(height / itemHeight)]);
  const visibleList = list.slice(indices[0], indices[1] + 1);
  console.log(visibleList);

  const handleScroll = (e) => {
    const { scrollTop } = e.target;
    const start = Math.floor(scrollTop / itemHeight);
    const end = start + Math.floor(height / itemHeight);
    setIndices([start, end]);
  };

  return (
    <div
      className="container"
      onScroll={handleScroll}
      style={{
        width,
        height,
        backgroundColor: "lightskyblue",
        overflow: "auto",
      }}
    >
      <div
        style={{
          height: list.length * itemHeight,
          width: "100%",
          position: "relative",
        }}
      >
        {visibleList.map((item, index) => {
          return (
            <div
              key={item}
              className="item"
              style={{
                height: itemHeight,
                backgroundColor: index % 2 === 0 ? "white" : "lightgray",
                borderTop: "5px solid black",
                position: "absolute",
                top: (index + indices[0]) * itemHeight,
                width: "100%",
                textAlign: "center",
              }}
            >
              {`Item ${item}`}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VirtualizedList;
