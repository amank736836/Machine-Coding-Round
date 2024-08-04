import { useEffect, useState } from "react";

const STATE = {
  LOADING: "LOADING",
  ERROR: "ERROR",
  SUCCESS: "SUCCESS",
};

export default function TypeAhead() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState(STATE.LOADING);
  console.log(results);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${query}&limit=5`
      );
      //   console.log(await response.json());
      const data = await response.json();
      //   console.log(data);
      setResults(data.products);
    };
    fetchData();
  }, [query]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul>
        {results.map((product) => {
          return <li key={product.id}>{product.title}</li>;
        })}
      </ul>
    </div>
  );
}
