import { useState } from "react";
import "./App.css";
import useDebounce from "./hooks/useDebounce";

function App() {
  const [search, setSearch] = useState("");
  const debounceValue = useDebounce(search, 2000);

  return (
    <div className="App">
      <h1>Custom Hook</h1>
      <h2>useDebounce</h2>
      <br />
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Debounced input"
      />
      <hr />
      <h2>
        Normal input: <span>{search}</span>
      </h2>
      <hr />
      <h2>
        Debounced input: <span>{debounceValue}</span>
      </h2>
      <hr />
    </div>
  );
}

export default App;
