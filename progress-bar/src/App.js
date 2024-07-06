import { useState } from "react";
import "./App.css";
import ProgressBar from "./Components/ProgressBar";

function App() {
  const [show, setShow] = useState(false);
  return (
    <div>

    <div className="app-container">
      <label class="switch">
        <input type="checkbox" onClick={() => setShow((prev) => !prev)} />
        <span class="slider"></span>
      </label>{" "}
    </div>
      {show && <ProgressBar />}
    </div>
  );
}

export default App;
