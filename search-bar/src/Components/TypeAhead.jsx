import { useEffect, useRef, useState } from "react";

const STATE = {
  LOADING: "LOADING",
  ERROR: "ERROR",
  SUCCESS: "SUCCESS",
};

export default function TypeAhead() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState(STATE.LOADING);
  const cache = useRef({});
  //   console.log(cache);
  //   console.log(results);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    const fetchData = async () => {
      console.log("fetchData");
      try {
        if (cache.current[query]) {
          console.log("cache");
          setResults(cache.current[query]);
          setStatus(STATE.SUCCESS);
          return;
        }
        setStatus(STATE.LOADING);
        const response = await fetch(
          `https://dummyjson.com/products/search?q=${query}&limit=5`,
          {
            signal,
          }
        );
        //   console.log(await response.json());
        const data = await response.json();
        //   console.log(data);
        cache.current[query] = data.products;
        setResults(data.products);
        setStatus(STATE.SUCCESS);
      } catch (error) {
        // console.log(error);
        if (error.name !== "AbortError") setStatus(STATE.ERROR);
      }
    };
    // fetchData();
    const timerId = setTimeout(fetchData, 1000);
    return () => {
      clearTimeout(timerId);
      abortController.abort();
    };
  }, [query]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {status === STATE.LOADING && <div>Loading...</div>}
      {status === STATE.ERROR && <div>Something went wrong...</div>}
      {status === STATE.SUCCESS && (
        <ul>
          {results.map((product) => {
            return <li key={product.id}>{product.title}</li>;
          })}
        </ul>
      )}
    </div>
  );
}
