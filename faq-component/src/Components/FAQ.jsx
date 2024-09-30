import React, { useCallback, useMemo, useState } from "react";
import QnA from "./QnA";

const FAQ = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  // useCallBack is used to memoize the function
  const handleToggle = useCallback((index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? -1 : index));
  }, []);
  return (
    <div>
      {data.map((faq, index) => (
        <QnA
          key={index}
          faq={faq}
          handleToggle={() => handleToggle(index)}
          showFaq={activeIndex === index}
        />
      ))}
    </div>
  );
};

export default FAQ;
