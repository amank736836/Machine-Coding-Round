import { useState } from "react";
import "./App.css";
// import Input from "./Components/Input";
import TicTacToe from "./Components/TicTacToe";

function App() {
  // const [size, setSize] = useState(3);
  return (
    <div className="App">
      {/* <Input 
      // size={size} setSize={setSize} 
      /> */}
      <TicTacToe size={5} />
    </div>
  );
}

export default App;
