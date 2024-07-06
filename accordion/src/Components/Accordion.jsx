import React, { useState } from "react";

function Accordion({ index, item }) {
  const [show, setShow] = useState(false);
  return (
    <div className="accordion">
      <h1>
        {item.question}
        <span
        onClick={() => setShow(!show)}
        >
            {show ? "➖" : "➕"}
        </span>
      </h1>
      {show ? <h4>{item.answer}</h4> : null}
    </div>
  );
}

export default Accordion;
