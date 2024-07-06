import React, { useEffect, useState } from "react";
import Accordion from "./Accordion";
import data from "../data.json";
import AccordionContainer from "./Accordion";

function Faq() {
  console.log(data);
  const [mainData, setMainData] = useState([]);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    const fetchData = data.faqs.filter((item, index) => index < limit);
    setMainData(fetchData);
    console.log(fetchData);
  }, [limit]);

  return (
    <div>
      <h1>Frequently Asked Questions</h1>
      <Accordion data={mainData} setLimit={setLimit} />
    </div>
  );
}

export default Faq;
