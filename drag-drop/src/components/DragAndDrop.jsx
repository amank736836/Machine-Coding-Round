import React, { useRef, useState } from "react";

const DragAndDrop = ({ initialState }) => {
  const [data, setData] = useState(initialState);
  const dragItem = useRef();
  const dragContainer = useRef();

  const handleDragStart = (e, item, container) => {
    dragItem.current = item;
    dragContainer.current = container;
    e.target.style.opacity = "0.9";
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = "1";
  };

  const handleDrop = (e, targetContainer) => {
    const item = dragItem.current;
    const sourceContainer = dragContainer.current;

    if (sourceContainer !== targetContainer) {
      setData((prevData) => {
        let updatedData = { ...prevData };
        updatedData[sourceContainer] = updatedData[sourceContainer].filter(
          (i) => i !== item
        );
        updatedData[targetContainer] = [...updatedData[targetContainer], item];

        return updatedData;
      });
    }
  };

  return (
    <div className="container">
      {Object.keys(data).map((container, index) => (
        <div
          key={index}
          className="column"
          onDrop={(e) => handleDrop(e, container)}
          onDragOver={(e) => e.preventDefault()}
        >
          <h2 className="header">{container}</h2>

          {data[container].map((item, index) => (
            <div
              key={index}
              className="row"
              draggable
              onDragStart={(e) => handleDragStart(e, item, container)}
              onDragEnd={handleDragEnd}
            >
              {item}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default DragAndDrop;
