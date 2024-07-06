import React, { useEffect, useState } from "react";
import Accordion from "./Accordion";

function AccordionContainer({ data, setLimit }) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // console.log(entries);
        if (entries[0].isIntersecting) {
          observer.unobserve(entries[0].target);
          setLimit((prevLimit) => prevLimit + 5);
        }
      },
      { threshold: 0.6 }
    );

    const lastAccordion = document.querySelector(".accordion:last-child");
    if (!lastAccordion) {
      return;
    }
    observer.observe(lastAccordion);

    return () => {
      if (lastAccordion) observer.unobserve(lastAccordion);
      observer.disconnect();
    };
  }, [data, setLimit]);

  const [show, setShow] = useState(false);

  return (
    <div>
      {data.map((item, index) => (
        <div className="accordion" key={index}>
          <h1>
            {item.question}
            <span onClick={() => setShow(!show)}>{show ? "➖" : "➕"}</span>
          </h1>
          {show ? <h4>{item.answer}</h4> : null}
        </div>
      ))}
    </div>
  );
}

export default AccordionContainer;
