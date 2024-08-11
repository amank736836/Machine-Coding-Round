import React, { useEffect, useState } from "react";

const Tabs = ({ tabsData, onChange }) => {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  useEffect(() => {
    onChange(currentTabIndex);
  }, [currentTabIndex]);

  return (
    <div className="tabs">
      <div className="tabs__container">
        {tabsData.map((item, index) => (
          <button
            key={index}
            className={`tabs__button ${
              currentTabIndex === index ? "active" : ""
            }`}
            onClick={() => setCurrentTabIndex(index)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="tabs__content">{tabsData[currentTabIndex].content}</div>
    </div>
  );
};

export default Tabs;
