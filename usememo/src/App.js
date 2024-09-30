import { useState } from "react";
import "./App.css";
import useCustomMemo from "./Hooks/useCustomMemo";

function expensiveCalculation(num) {
  console.log("Running expensiveCalculation", num);
  for (let i = 0; i < 100000; i++) {}
  return num * 2;
}

function App() {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState("");

  const doubleValue = useCustomMemo(() => expensiveCalculation(count), [count]);

  return (
    <div className="App">
      <h1>useMemo Example</h1>
      <h2>Count: {count}</h2>
      <h2>Double Value: {doubleValue}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
}

export default App;
