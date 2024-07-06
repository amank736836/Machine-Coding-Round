import React, { useEffect } from "react";
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

  return (
    <div>
      {data.map((item, index) => (
        <Accordion key={index} item={item} />
      ))}
    </div>
  );
}

export default AccordionContainer;
