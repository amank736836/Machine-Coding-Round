import React, { useState } from "react";

const ParticularAccordion = ({ item, index }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="accordion" key={index}>
      <h1>
        {item.question}
        <span onClick={() => setShow(!show)}>{show ? "➖" : "➕"}</span>
      </h1>
      {show ? <h4>{item.answer}</h4> : null}
    </div>
  );
};

export default ParticularAccordion;
